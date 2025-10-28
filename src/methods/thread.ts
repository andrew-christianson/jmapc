// Thread methods

import { JMAP_URN_MAIL } from '../constants';
import { Thread } from '../models/thread';
import { Changes, ChangesResponse, Get, GetResponse } from './base';

/**
 * Thread method base
 */
export interface ThreadBase {
  using?: string[];
}

// Thread/changes
export interface ThreadChanges extends ThreadBase, Changes {}
export interface ThreadChangesResponse extends ThreadBase, ChangesResponse {}

// Thread/get
export interface ThreadGet extends ThreadBase, Get {}
export interface ThreadGetResponse extends ThreadBase, GetResponse {
  list: Thread[];
}

// Helper functions
export function createThreadGet(params?: {
  ids?: string[];
  accountId?: string;
}): ThreadGet {
  return {
    methodNamespace: 'Thread',
    methodType: 'get',
    using: [JMAP_URN_MAIL],
    ids: params?.ids,
    accountId: params?.accountId,
  };
}
