// Search snippet methods

import { JMAP_URN_MAIL } from '../constants';
import { EmailQueryFilter } from '../models/email';
import { SearchSnippet } from '../models/searchSnippet';
import { ListOrRef, TypeOrRef } from '../types';
import { Get, GetResponseWithoutState } from './base';

/**
 * Search snippet method base
 */
export interface SearchSnippetBase {
  using?: string[];
}

// SearchSnippet/get
export interface SearchSnippetGet extends SearchSnippetBase, Get {
  emailIds?: ListOrRef<string> | null;
  filter?: TypeOrRef<EmailQueryFilter> | null;
}

export interface SearchSnippetGetResponse
  extends SearchSnippetBase,
    GetResponseWithoutState {
  list: SearchSnippet[];
}

// Helper functions
export function createSearchSnippetGet(params: {
  emailIds?: string[];
  filter?: EmailQueryFilter;
  accountId?: string;
}): SearchSnippetGet {
  return {
    methodNamespace: 'SearchSnippet',
    methodType: 'get',
    using: [JMAP_URN_MAIL],
    emailIds: params.emailIds,
    filter: params.filter,
    accountId: params.accountId,
  };
}
