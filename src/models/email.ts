// Email models

import { EmailAddress } from './common';
import { StrOrRef, ListOrRef, Operator } from '../types';

/**
 * Email message
 */
export interface Email {
  id?: string | null;
  blobId?: string | null;
  threadId?: string | null;
  mailboxIds?: Record<string, boolean> | null;
  keywords?: Record<string, boolean> | null;
  size?: number | null;
  receivedAt?: Date | null;
  messageId?: string[] | null;
  inReplyTo?: string[] | null;
  references?: string[] | null;
  headers?: EmailHeader[] | null;
  from?: EmailAddress[] | null;
  to?: EmailAddress[] | null;
  cc?: EmailAddress[] | null;
  bcc?: EmailAddress[] | null;
  replyTo?: EmailAddress[] | null;
  subject?: string | null;
  sentAt?: Date | null;
  bodyStructure?: EmailBodyPart | null;
  bodyValues?: Record<string, EmailBodyValue> | null;
  textBody?: EmailBodyPart[] | null;
  htmlBody?: EmailBodyPart[] | null;
  attachments?: EmailBodyPart[] | null;
  hasAttachment?: boolean | null;
  preview?: string | null;
}

/**
 * Email header
 */
export interface EmailHeader {
  name?: string | null;
  value?: string | null;
}

/**
 * Email body part (MIME part)
 */
export interface EmailBodyPart {
  partId?: string | null;
  blobId?: string | null;
  size?: number | null;
  headers?: EmailHeader[] | null;
  name?: string | null;
  type?: string | null;
  charset?: string | null;
  disposition?: string | null;
  cid?: string | null;
  language?: string[] | null;
  location?: string | null;
  subParts?: EmailBodyPart[] | null;
}

/**
 * Email body value
 */
export interface EmailBodyValue {
  value?: string | null;
  isEncodingProblem?: boolean | null;
  isTruncated?: boolean | null;
}

/**
 * Email query filter condition
 */
export interface EmailQueryFilterCondition {
  inMailbox?: StrOrRef | null;
  inMailboxOtherThan?: ListOrRef<string> | null;
  before?: Date | null;
  after?: Date | null;
  minSize?: number | null;
  maxSize?: number | null;
  allInThreadHaveKeyword?: StrOrRef | null;
  someInThreadHaveKeyword?: StrOrRef | null;
  noneInThreadHaveKeyword?: StrOrRef | null;
  hasKeyword?: StrOrRef | null;
  notKeyword?: StrOrRef | null;
  hasAttachment?: boolean | null;
  text?: StrOrRef | null;
  from?: string | null;
  to?: StrOrRef | null;
  cc?: StrOrRef | null;
  bcc?: StrOrRef | null;
  body?: StrOrRef | null;
  header?: ListOrRef<string> | null;
}

/**
 * Email query filter operator
 */
export interface EmailQueryFilterOperator {
  operator: Operator;
  conditions: EmailQueryFilter[];
}

/**
 * Email query filter (union type)
 */
export type EmailQueryFilter =
  | EmailQueryFilterCondition
  | EmailQueryFilterOperator;
