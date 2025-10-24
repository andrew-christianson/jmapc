// API request and response handling

import { JMAP_URN_CORE } from './constants';
import { JMAPError } from './errors';
import {
  Invocation,
  InvocationResponseOrError,
  Method,
  Response,
  getMethodName,
} from './methods/base';
import { keysToCamel, keysToSnake, removeNullish } from './types';

/**
 * API Response from JMAP server
 */
export interface APIResponse {
  sessionState: string;
  methodResponses: InvocationResponseOrError[];
  createdIds?: string[];
}

/**
 * API Request to JMAP server
 */
export interface APIRequest {
  using: string[];
  methodCalls: [string, any, string][];
}

/**
 * Decode method responses from raw response data
 */
function decodeMethodResponses(
  responses: [string, any, string][]
): InvocationResponseOrError[] {
  return responses.map(([name, response, methodId]) => {
    let decodedResponse: Response | JMAPError;

    if (name === 'error') {
      decodedResponse = JMAPError.fromDict(keysToCamel(response));
    } else {
      // For now, use CustomResponse for all responses
      // In a more complete implementation, we'd have a response type registry
      decodedResponse = keysToCamel(response) as Response;
    }

    return {
      id: methodId,
      response: decodedResponse,
    };
  });
}

/**
 * Parse API response from raw JSON
 */
export function parseAPIResponse(data: any): APIResponse {
  const camelData = keysToCamel(data);
  return {
    sessionState: camelData.sessionState,
    methodResponses: decodeMethodResponses(data.methodResponses),
    createdIds: camelData.createdIds || [],
  };
}

/**
 * Create API request from method calls
 */
export function createAPIRequest(
  accountId: string,
  calls: Method | Method[]
): APIRequest {
  const callsList = Array.isArray(calls) ? calls : [calls];
  const invocations: Invocation[] = [];

  // Create invocations for methods
  callsList.forEach((method, i) => {
    const callId = callsList.length > 1 ? i.toString() : 'single';
    const methodName = getMethodName(method as any);
    invocations.push({
      id: `${callId}.${methodName}`,
      method,
      methodName,
    });
  });

  // Build method calls list
  const methodCalls: [string, any, string][] = invocations.map(
    (invocation) => {
      const method = invocation.method as any;

      // Set account ID if needed
      if (method.accountId === undefined && accountId) {
        method.accountId = accountId;
      }

      // Convert to dict (plain object) and apply transformations
      const methodData = keysToSnake(removeNullish(method));

      // Remove internal fields
      delete methodData.method_namespace;
      delete methodData.method_type;
      delete methodData.using;
      delete methodData.jmap_method;

      return [invocation.methodName, methodData, invocation.id];
    }
  );

  // Collect all 'using' URNs
  const usingSet = new Set<string>([JMAP_URN_CORE]);
  callsList.forEach((method: any) => {
    if (method.using && Array.isArray(method.using)) {
      method.using.forEach((urn: string) => usingSet.add(urn));
    }
  });

  return {
    using: Array.from(usingSet).sort(),
    methodCalls,
  };
}

/**
 * Serialize API request to JSON
 */
export function serializeAPIRequest(request: APIRequest): any {
  return {
    using: request.using,
    methodCalls: request.methodCalls,
  };
}
