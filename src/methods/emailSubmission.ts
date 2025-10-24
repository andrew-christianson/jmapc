// Email submission methods

import { JMAP_URN_SUBMISSION } from '../constants';
import {
  EmailSubmission,
  EmailSubmissionQueryFilter,
} from '../models/emailSubmission';
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
 * Email submission method base
 */
export interface EmailSubmissionBase {
  using?: string[];
}

// EmailSubmission/changes
export interface EmailSubmissionChanges extends EmailSubmissionBase, Changes {}
export interface EmailSubmissionChangesResponse
  extends EmailSubmissionBase,
    ChangesResponse {}

// EmailSubmission/get
export interface EmailSubmissionGet extends EmailSubmissionBase, Get {}
export interface EmailSubmissionGetResponse
  extends EmailSubmissionBase,
    GetResponse {
  list: EmailSubmission[];
}

// EmailSubmission/query
export interface EmailSubmissionQuery extends EmailSubmissionBase, Query {
  filter?: EmailSubmissionQueryFilter | null;
}

export interface EmailSubmissionQueryResponse
  extends EmailSubmissionBase,
    QueryResponse {}

// EmailSubmission/queryChanges
export interface EmailSubmissionQueryChanges
  extends EmailSubmissionBase,
    QueryChanges {
  filter?: EmailSubmissionQueryFilter | null;
}

export interface EmailSubmissionQueryChangesResponse
  extends EmailSubmissionBase,
    QueryChangesResponse {}

// EmailSubmission/set
export interface EmailSubmissionSet extends EmailSubmissionBase, Set {
  create?: Record<string, EmailSubmission> | null;
  onSuccessUpdateEmail?: Record<string, any> | null;
  onSuccessDestroyEmail?: string[] | null;
}

export interface EmailSubmissionSetResponse
  extends EmailSubmissionBase,
    SetResponse {
  created?: Record<string, EmailSubmission | null> | null;
  updated?: Record<string, EmailSubmission | null> | null;
}

// Helper functions
export function createEmailSubmissionGet(params?: {
  ids?: string[];
  accountId?: string;
}): EmailSubmissionGet {
  return {
    methodNamespace: 'EmailSubmission',
    methodType: 'get',
    using: [JMAP_URN_SUBMISSION],
    ids: params?.ids,
    accountId: params?.accountId,
  };
}
