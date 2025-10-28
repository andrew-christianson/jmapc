// Mailbox methods

import { JMAP_URN_MAIL } from '../constants';
import { Mailbox, MailboxQueryFilter } from '../models/mailbox';
import {
  Changes,
  ChangesResponse,
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
 * Mailbox method base
 */
export interface MailboxBase {
  using?: string[];
}

// Mailbox/changes
export interface MailboxChanges extends MailboxBase, Changes {}
export interface MailboxChangesResponse extends MailboxBase, ChangesResponse {}

// Mailbox/get
export interface MailboxGet extends MailboxBase, Get {}
export interface MailboxGetResponse extends MailboxBase, GetResponse {
  list: Mailbox[];
}

// Mailbox/query
export interface MailboxQuery extends MailboxBase, Query {
  filter?: MailboxQueryFilter | null;
  sortAsTree?: boolean;
  filterAsTree?: boolean;
}

export interface MailboxQueryResponse extends MailboxBase, QueryResponse {}

// Mailbox/queryChanges
export interface MailboxQueryChanges extends MailboxBase, QueryChanges {
  filter?: MailboxQueryFilter | null;
}

export interface MailboxQueryChangesResponse
  extends MailboxBase,
    QueryChangesResponse {}

// Mailbox/set
export interface MailboxSet extends MailboxBase, Set {
  create?: Record<string, Mailbox> | null;
  onDestroyRemoveEmails?: boolean;
}

export interface MailboxSetResponse extends MailboxBase, SetResponse {
  created?: Record<string, Mailbox | null> | null;
  updated?: Record<string, Mailbox | null> | null;
}

// Helper functions
export function createMailboxGet(params: {
  ids?: string[] | null;
  accountId?: string;
}): MailboxGet {
  return {
    methodNamespace: 'Mailbox',
    methodType: 'get',
    using: [JMAP_URN_MAIL],
    ids: params.ids,
    accountId: params.accountId,
  };
}

export function createMailboxQuery(params?: {
  filter?: MailboxQueryFilter;
  accountId?: string;
}): MailboxQuery {
  return {
    methodNamespace: 'Mailbox',
    methodType: 'query',
    using: [JMAP_URN_MAIL],
    filter: params?.filter,
    accountId: params?.accountId,
  };
}
