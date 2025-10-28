// Common JMAP models

import { Operator } from '../types';

/**
 * Blob reference
 */
export interface Blob {
  blobId: string;
  type: string;
  size: number;
}

/**
 * Email address
 */
export interface EmailAddress {
  name?: string | null;
  email?: string | null;
}

/**
 * Added item in query results
 */
export interface AddedItem {
  id: string;
  index: number;
}

/**
 * Comparator for sorting
 */
export interface Comparator {
  property: string;
  isAscending?: boolean;
  collation?: string | null;
  anchor?: string | null;
  anchorOffset?: number;
  limit?: number | null;
  calculateTotal?: boolean;
  position?: number;
}

/**
 * Filter operator
 */
export interface FilterOperator {
  operator: Operator;
}

/**
 * Set error
 */
export interface SetError {
  type: string;
  description?: string | null;
  alreadyExists?: string | null;
  notFound?: string[] | null;
  properties?: string[] | null;
}
