// JMAP client

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import EventSource from 'eventsource';
import {
  APIRequest,
  createAPIRequest,
  parseAPIResponse,
  serializeAPIRequest,
} from './api';
import { JMAP_URN_CORE, JMAP_URN_MAIL, JMAP_URN_SUBMISSION } from './constants';
import { JMAPError } from './errors';
import {
  InvocationResponseOrError,
  Method,
  Response,
} from './methods/base';
import { Blob } from './models/common';
import { EmailBodyPart } from './models/email';
import { Event } from './models/event';
import { Session, getCapabilityUrns } from './session';
import { keysToCamel } from './types';

const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Event source configuration
 */
export interface EventSourceConfig {
  types?: string;
  closeafter?: 'state' | 'no';
  ping?: number;
}

/**
 * Client error
 */
export class ClientError extends Error {
  result: InvocationResponseOrError[];

  constructor(message: string, result: InvocationResponseOrError[]) {
    super(message);
    this.name = 'ClientError';
    this.result = result;
  }
}

/**
 * Authentication options
 */
export interface AuthOptions {
  apiToken?: string;
  username?: string;
  password?: string;
}

/**
 * JMAP Client
 */
export class Client {
  private host: string;
  private auth?: AuthOptions;
  private axiosInstance: AxiosInstance;
  private cachedSession?: Session;
  private eventSourceConfig: EventSourceConfig;

  constructor(
    host: string,
    auth?: AuthOptions,
    eventSourceConfig?: EventSourceConfig
  ) {
    this.host = host;
    this.auth = auth;
    this.eventSourceConfig = eventSourceConfig || {
      types: '*',
      closeafter: 'no',
      ping: 0,
    };

    // Create axios instance with auth
    const config: AxiosRequestConfig = {
      timeout: REQUEST_TIMEOUT,
    };

    if (auth?.apiToken) {
      config.headers = {
        Authorization: `Bearer ${auth.apiToken}`,
      };
    } else if (auth?.username && auth?.password) {
      config.auth = {
        username: auth.username,
        password: auth.password,
      };
    }

    this.axiosInstance = axios.create(config);
  }

  /**
   * Create client with API token authentication
   */
  static createWithApiToken(host: string, apiToken: string): Client {
    return new Client(host, { apiToken });
  }

  /**
   * Create client with password authentication
   */
  static createWithPassword(
    host: string,
    username: string,
    password: string
  ): Client {
    return new Client(host, { username, password });
  }

  /**
   * Get JMAP session
   */
  async getSession(): Promise<Session> {
    if (this.cachedSession) {
      return this.cachedSession;
    }

    const response = await this.axiosInstance.get(
      `https://${this.host}/.well-known/jmap`
    );

    this.cachedSession = keysToCamel(response.data) as Session;
    return this.cachedSession;
  }

  /**
   * Get primary account ID
   */
  async getAccountId(): Promise<string> {
    const session = await this.getSession();
    const accountId =
      session.primaryAccounts[JMAP_URN_CORE] ||
      session.primaryAccounts[JMAP_URN_MAIL] ||
      session.primaryAccounts[JMAP_URN_SUBMISSION];

    if (!accountId) {
      throw new Error('No primary account ID found');
    }

    return accountId;
  }

  /**
   * Upload a blob
   */
  async uploadBlob(data: Buffer, contentType?: string): Promise<Blob> {
    const session = await this.getSession();
    const accountId = await this.getAccountId();
    const uploadUrl = session.uploadUrl.replace('{accountId}', accountId);

    const response = await this.axiosInstance.post(uploadUrl, data, {
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
      },
    });

    return keysToCamel(response.data) as Blob;
  }

  /**
   * Download an attachment
   */
  async downloadAttachment(attachment: EmailBodyPart): Promise<Buffer> {
    const session = await this.getSession();
    const accountId = await this.getAccountId();

    if (!attachment.blobId) {
      throw new Error('Attachment has no blobId');
    }

    const downloadUrl = session.downloadUrl
      .replace('{accountId}', accountId)
      .replace('{blobId}', attachment.blobId)
      .replace('{name}', attachment.name || 'attachment')
      .replace('{type}', attachment.type || 'application/octet-stream');

    const response = await this.axiosInstance.get(downloadUrl, {
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data);
  }

  /**
   * Execute JMAP request
   */
  async request(
    calls: Method | Method[],
    options?: {
      raiseErrors?: boolean;
      singleResponse?: boolean;
    }
  ): Promise<
    | Response
    | JMAPError
    | (Response | JMAPError)[]
    | InvocationResponseOrError[]
  > {
    const raiseErrors = options?.raiseErrors ?? false;
    const singleResponse = options?.singleResponse ?? false;

    if (Array.isArray(calls) && singleResponse) {
      throw new Error(
        'singleResponse cannot be used with multiple JMAP request methods'
      );
    }

    const accountId = await this.getAccountId();
    const apiRequest = createAPIRequest(accountId, calls);

    // Validate URNs
    const session = await this.getSession();
    const sessionUrns = new Set(getCapabilityUrns(session.capabilities));
    const unsupportedUrns = apiRequest.using.filter(
      (urn) => !sessionUrns.has(urn)
    );

    if (unsupportedUrns.length > 0) {
      console.warn(
        `URNs in request are not in server capabilities: ${unsupportedUrns.join(', ')}`
      );
    }

    // Execute request
    const result = await this.apiRequest(apiRequest);

    // Check for errors
    if (raiseErrors) {
      const hasErrors = result.some((r) => r.response instanceof JMAPError);
      if (hasErrors) {
        throw new ClientError('Errors found in method responses', result);
      }
    }

    // Return results
    if (!Array.isArray(calls)) {
      if (result.length > 1 && singleResponse) {
        throw new ClientError(
          `${result.length} method responses received for single method call`,
          result
        );
      }
      if (result.length === 1) {
        return result[0].response;
      }
      return result.map((r) => r.response);
    }

    return result;
  }

  /**
   * Execute API request
   */
  private async apiRequest(
    request: APIRequest
  ): Promise<InvocationResponseOrError[]> {
    const session = await this.getSession();
    const requestData = serializeAPIRequest(request);

    const response = await this.axiosInstance.post(
      session.apiUrl,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const apiResponse = parseAPIResponse(response.data);

    // Check if session state changed
    if (apiResponse.sessionState !== session.state) {
      console.debug(
        `JMAP response session state "${apiResponse.sessionState}" differs from cached state "${session.state}", invalidating cached state`
      );
      this.cachedSession = undefined;
    }

    return apiResponse.methodResponses;
  }

  /**
   * Get event stream
   */
  async *events(): AsyncGenerator<Event, void, unknown> {
    const session = await this.getSession();
    const eventSourceUrl = this.formatEventSourceUrl(
      session.eventSourceUrl,
      this.eventSourceConfig
    );

    const eventSource = new EventSource(eventSourceUrl, {
      headers: this.auth?.apiToken
        ? { Authorization: `Bearer ${this.auth.apiToken}` }
        : undefined,
    });

    const eventQueue: Event[] = [];
    let resolveNext: ((value: Event) => void) | null = null;

    eventSource.addEventListener('state', (event: any) => {
      const parsedEvent: Event = {
        id: event.lastEventId,
        data: JSON.parse(event.data),
      };

      if (resolveNext) {
        resolveNext(parsedEvent);
        resolveNext = null;
      } else {
        eventQueue.push(parsedEvent);
      }
    });

    try {
      while (true) {
        if (eventQueue.length > 0) {
          yield eventQueue.shift()!;
        } else {
          yield await new Promise<Event>((resolve) => {
            resolveNext = resolve;
          });
        }
      }
    } finally {
      eventSource.close();
    }
  }

  /**
   * Format event source URL with config
   */
  private formatEventSourceUrl(
    url: string,
    config: EventSourceConfig
  ): string {
    return url
      .replace('{types}', config.types || '*')
      .replace('{closeafter}', config.closeafter || 'no')
      .replace('{ping}', (config.ping || 0).toString());
  }
}
