// Email submission models

import { Operator } from '../types';

/**
 * Undo status enum
 */
export enum UndoStatus {
  PENDING = 'pending',
  FINAL = 'final',
  CANCELED = 'canceled',
}

/**
 * Delivered status enum
 */
export enum Delivered {
  QUEUED = 'queued',
  YES = 'yes',
  NO = 'no',
  UNKNOWN = 'unknown',
}

/**
 * Displayed status enum
 */
export enum Displayed {
  UNKNOWN = 'unknown',
  YES = 'yes',
}

/**
 * Address for email submission
 */
export interface Address {
  email?: string | null;
  parameters?: Record<string, string> | null;
}

/**
 * Envelope for email submission
 */
export interface Envelope {
  mailFrom?: Address | null;
  rcptTo?: Address[] | null;
}

/**
 * Delivery status
 */
export interface DeliveryStatus {
  smtpReply: string;
  delivered: Delivered;
  displayed: Displayed;
}

/**
 * Email submission
 */
export interface EmailSubmission {
  id?: string | null;
  identityId?: string | null;
  emailId?: string | null;
  threadId?: string | null;
  envelope?: Envelope | null;
  sendAt?: Date | null;
  undoStatus?: UndoStatus | null;
  deliveryStatus?: Record<string, DeliveryStatus> | null;
  dsnBlobIds?: string[] | null;
  mdnBlobIds?: string[] | null;
}

/**
 * Email submission query filter condition
 */
export interface EmailSubmissionQueryFilterCondition {
  identityIds?: string[] | null;
  emailIds?: string[] | null;
  threadIds?: string[] | null;
  undoStatus?: UndoStatus | null;
  before?: Date | null;
  after?: Date | null;
}

/**
 * Email submission query filter operator
 */
export interface EmailSubmissionQueryFilterOperator {
  operator: Operator;
  conditions: EmailSubmissionQueryFilter[];
}

/**
 * Email submission query filter (union type)
 */
export type EmailSubmissionQueryFilter =
  | EmailSubmissionQueryFilterCondition
  | EmailSubmissionQueryFilterOperator;
