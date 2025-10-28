// Email methods

import { JMAP_URN_MAIL } from '../constants';
import { Email, EmailQueryFilter } from '../models/email';
import {
  Changes,
  ChangesResponse,
  Copy,
  CopyResponse,
  Get,
  GetResponse,
  Query,
  QueryChanges,
  QueryChangesResponse,
  QueryResponse,
  Set,
  SetResponse,
} from './base';

/**
 * Email method base
 */
export interface EmailBase {
  using?: string[];
}

// Email/changes
export interface EmailChanges extends EmailBase, Changes {}
export interface EmailChangesResponse extends EmailBase, ChangesResponse {}

// Email/copy
export interface EmailCopy extends EmailBase, Copy {
  create?: Record<string, Email> | null;
}
export interface EmailCopyResponse extends EmailBase, CopyResponse {
  created?: Record<string, Email> | null;
}

// Email/get
export interface EmailGet extends EmailBase, Get {
  bodyProperties?: string[] | null;
  fetchTextBodyValues?: boolean | null;
  fetchHTMLBodyValues?: boolean | null;
  fetchAllBodyValues?: boolean | null;
  maxBodyValueBytes?: number | null;
}

export interface EmailGetResponse extends EmailBase, GetResponse {
  list: Email[];
}

// Email/query
export interface EmailQuery extends EmailBase, Query {
  filter?: EmailQueryFilter | null;
  collapseThreads?: boolean | null;
}

export interface EmailQueryResponse extends EmailBase, QueryResponse {}

// Email/queryChanges
export interface EmailQueryChanges extends EmailBase, QueryChanges {
  filter?: EmailQueryFilter | null;
  collapseThreads?: boolean | null;
}

export interface EmailQueryChangesResponse
  extends EmailBase,
    QueryChangesResponse {}

// Email/set
export interface EmailSet extends EmailBase, Set {
  create?: Record<string, Email> | null;
}

export interface EmailSetResponse extends EmailBase, SetResponse {
  created?: Record<string, Email | null> | null;
  updated?: Record<string, Email | null> | null;
}

// Helper functions
export function createEmailGet(params: {
  ids?: string[] | null;
  properties?: string[] | null;
  accountId?: string;
}): EmailGet {
  return {
    methodNamespace: 'Email',
    methodType: 'get',
    using: [JMAP_URN_MAIL],
    ids: params.ids,
    properties: params.properties,
    accountId: params.accountId,
  };
}

export function createEmailQuery(params: {
  filter?: EmailQueryFilter;
  sort?: any[];
  accountId?: string;
}): EmailQuery {
  return {
    methodNamespace: 'Email',
    methodType: 'query',
    using: [JMAP_URN_MAIL],
    filter: params.filter,
    sort: params.sort,
    accountId: params.accountId,
  };
}

export function createEmailSet(params: {
  create?: Record<string, Email>;
  update?: Record<string, Partial<Email>>;
  destroy?: string[];
  accountId?: string;
}): EmailSet {
  return {
    methodNamespace: 'Email',
    methodType: 'set',
    using: [JMAP_URN_MAIL],
    create: params.create,
    update: params.update,
    destroy: params.destroy,
    accountId: params.accountId,
  };
}
