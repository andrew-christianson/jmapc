// Base method classes for JMAP

import { JMAPError } from '../errors';
import {
  AddedItem,
  Comparator,
  SetError,
} from '../models/common';
import { ListOrRef, StrOrRef } from '../types';

/**
 * Base method interface
 */
export interface MethodBase {
  using?: string[];
  methodNamespace?: string | null;
}

/**
 * Method interface
 */
export interface Method extends MethodBase {
  jmapMethod?: string | null;
}

/**
 * Method with account ID
 */
export interface MethodWithAccount extends Method {
  accountId?: string | null;
}

/**
 * Response interface
 */
export interface Response extends MethodBase {}

/**
 * Response with account ID
 */
export interface ResponseWithAccount extends Response {
  accountId?: string | null;
}

/**
 * Invocation (method call with ID)
 */
export interface Invocation {
  id: string;
  method: Method;
  methodName: string;
}

/**
 * Invocation response
 */
export interface InvocationResponse {
  id: string;
  response: Response;
}

/**
 * Invocation response or error
 */
export interface InvocationResponseOrError {
  id: string;
  response: Response | JMAPError;
}

/**
 * Get method name from method object
 */
export function getMethodName(
  method: Method & { methodType?: string; methodNamespace?: string }
): string {
  if (method.jmapMethod) {
    return method.jmapMethod;
  }
  if (!method.methodNamespace) {
    throw new Error('Method has no method namespace');
  }
  if (!method.methodType) {
    throw new Error('Method has no method type');
  }
  return `${method.methodNamespace}/${method.methodType}`;
}

// Changes method
export interface ChangesMethod {
  methodType: 'changes';
}

export interface Changes extends MethodWithAccount, ChangesMethod {
  sinceState: string;
  maxChanges?: number | null;
}

export interface ChangesResponse extends ResponseWithAccount, ChangesMethod {
  oldState: string;
  newState: string;
  hasMoreChanges: boolean;
  created: string[];
  updated: string[];
  destroyed: string[];
}

// Copy method
export interface CopyMethod {
  methodType: 'copy';
}

export interface Copy extends MethodWithAccount, CopyMethod {
  fromAccountId: string;
  ifFromInState?: string | null;
  ifInState?: string | null;
  onSuccessDestroyOriginal?: boolean;
  destroyFromIfInState?: string | null;
}

export interface CopyResponse extends ResponseWithAccount, CopyMethod {
  fromAccountId: string;
  oldState: string;
  newState: string;
  notCreated?: Record<string, SetError> | null;
}

// Get method
export interface GetMethod {
  methodType: 'get';
}

export interface Get extends MethodWithAccount, GetMethod {
  ids?: ListOrRef<string> | null;
  properties?: string[] | null;
}

export interface GetResponseWithoutState
  extends ResponseWithAccount,
    GetMethod {
  notFound?: string[] | null;
}

export interface GetResponse extends GetResponseWithoutState {
  state?: string | null;
}

// Set method
export interface SetMethod {
  methodType: 'set';
}

export interface Set extends MethodWithAccount, SetMethod {
  ifInState?: StrOrRef | null;
  create?: Record<string, any> | null;
  update?: Record<string, Record<string, any>> | null;
  destroy?: ListOrRef<string> | null;
}

export interface SetResponse extends ResponseWithAccount, SetMethod {
  oldState?: string | null;
  newState?: string | null;
  created?: Record<string, any> | null;
  updated?: Record<string, any> | null;
  destroyed?: string[] | null;
  notCreated?: Record<string, SetError> | null;
  notUpdated?: Record<string, SetError> | null;
  notDestroyed?: Record<string, SetError> | null;
}

// Query method
export interface QueryMethod {
  methodType: 'query';
}

export interface Query extends MethodWithAccount, QueryMethod {
  sort?: Comparator[] | null;
  position?: number | null;
  anchor?: string | null;
  anchorOffset?: number | null;
  limit?: number | null;
  calculateTotal?: boolean | null;
}

export interface QueryResponse extends ResponseWithAccount, QueryMethod {
  queryState: string;
  canCalculateChanges: boolean;
  position: number;
  ids: ListOrRef<string>;
  total?: number | null;
  limit?: number | null;
}

// QueryChanges method
export interface QueryChangesMethod {
  methodType: 'queryChanges';
}

export interface QueryChanges extends MethodWithAccount, QueryChangesMethod {
  sort?: Comparator[] | null;
  sinceQueryState?: string | null;
  maxChanges?: number | null;
  upToId?: string | null;
  calculateTotal?: boolean;
}

export interface QueryChangesResponse
  extends ResponseWithAccount,
    QueryChangesMethod {
  oldQueryState: string;
  newQueryState: string;
  removed: string[];
  added: AddedItem[];
  total?: number | null;
}

// Type aliases
export type ResponseOrError = Response | JMAPError;
export type Request = Method | Invocation;
