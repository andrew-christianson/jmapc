// Mailbox models

import { StrOrRef, Operator } from '../types';

/**
 * Mailbox (folder)
 */
export interface Mailbox {
  id?: string | null;
  name?: string | null;
  sortOrder?: number | null;
  totalEmails?: number | null;
  unreadEmails?: number | null;
  totalThreads?: number | null;
  unreadThreads?: number | null;
  isSubscribed?: boolean | null;
  role?: string | null;
  parentId?: string | null;
}

/**
 * Mailbox query filter condition
 */
export interface MailboxQueryFilterCondition {
  name?: StrOrRef | null;
  role?: StrOrRef | null;
  parentId?: StrOrRef | null;
  hasAnyRole?: boolean | null;
  isSubscribed?: boolean | null;
}

/**
 * Mailbox query filter operator
 */
export interface MailboxQueryFilterOperator {
  operator: Operator;
  conditions: MailboxQueryFilter[];
}

/**
 * Mailbox query filter (union type)
 */
export type MailboxQueryFilter =
  | MailboxQueryFilterCondition
  | MailboxQueryFilterOperator;
