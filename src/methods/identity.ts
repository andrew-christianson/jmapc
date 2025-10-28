// Identity methods

import { JMAP_URN_SUBMISSION } from '../constants';
import { Identity } from '../models/identity';
import { ListOrRef } from '../types';
import {
  Changes,
  ChangesResponse,
  Get,
  GetResponse,
  Set,
  SetResponse,
} from './base';

/**
 * Identity method base
 */
export interface IdentityBase {
  using?: string[];
}

// Identity/changes
export interface IdentityChanges extends IdentityBase, Changes {}
export interface IdentityChangesResponse
  extends IdentityBase,
    ChangesResponse {}

// Identity/get
export interface IdentityGet extends IdentityBase, Get {
  ids?: ListOrRef<string> | null;
}

export interface IdentityGetResponse extends IdentityBase, GetResponse {
  list: Identity[];
}

// Identity/set
export interface IdentitySet extends IdentityBase, Set {
  create?: Record<string, Identity> | null;
}

export interface IdentitySetResponse extends IdentityBase, SetResponse {
  created?: Record<string, Identity | null> | null;
  updated?: Record<string, Identity | null> | null;
}

// Helper functions
export function createIdentityGet(params?: {
  ids?: string[];
  accountId?: string;
}): IdentityGet {
  return {
    methodNamespace: 'Identity',
    methodType: 'get',
    using: [JMAP_URN_SUBMISSION],
    ids: params?.ids,
    accountId: params?.accountId,
  };
}
