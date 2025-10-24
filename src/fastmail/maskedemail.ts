// Fastmail MaskedEmail extension

import { JMAP_URN_FASTMAIL_MASKEDEMAIL } from '../constants';
import { Get, GetResponse, Set, SetResponse } from '../methods/base';

/**
 * Masked email state
 */
export enum MaskedEmailState {
  PENDING = 'pending',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  DELETED = 'deleted',
}

/**
 * Masked email
 */
export interface MaskedEmail {
  id?: string | null;
  email?: string | null;
  state?: MaskedEmailState | null;
  forDomain?: string | null;
  description?: string | null;
  lastMessageAt?: Date | null;
  createdAt?: Date | null;
  createdBy?: string | null;
  url?: string | null;
  emailPrefix?: string | null;
}

/**
 * Masked email method base
 */
export interface MaskedEmailBase {
  using?: string[];
}

// MaskedEmail/get
export interface MaskedEmailGet extends MaskedEmailBase, Get {}

export interface MaskedEmailGetResponse extends MaskedEmailBase, GetResponse {
  list: MaskedEmail[];
}

// MaskedEmail/set
export interface MaskedEmailSet extends MaskedEmailBase, Set {}

export interface MaskedEmailSetResponse extends MaskedEmailBase, SetResponse {
  created?: Record<string, MaskedEmail | null> | null;
  updated?: Record<string, MaskedEmail | null> | null;
}

// Helper functions
export function createMaskedEmailGet(params?: {
  ids?: string[];
  accountId?: string;
}): MaskedEmailGet {
  return {
    methodNamespace: 'MaskedEmail',
    methodType: 'get',
    using: [JMAP_URN_FASTMAIL_MASKEDEMAIL],
    ids: params?.ids,
    accountId: params?.accountId,
  };
}

export function createMaskedEmailSet(params?: {
  create?: Record<string, MaskedEmail>;
  update?: Record<string, Partial<MaskedEmail>>;
  destroy?: string[];
  accountId?: string;
}): MaskedEmailSet {
  return {
    methodNamespace: 'MaskedEmail',
    methodType: 'set',
    using: [JMAP_URN_FASTMAIL_MASKEDEMAIL],
    create: params?.create,
    update: params?.update,
    destroy: params?.destroy,
    accountId: params?.accountId,
  };
}
