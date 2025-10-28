// Custom methods for arbitrary JMAP calls

import { MethodWithAccount, ResponseWithAccount } from './base';

/**
 * Custom method for arbitrary JMAP method calls
 */
export interface CustomMethod extends MethodWithAccount {
  jmapMethod?: string;
  using?: string[];
  data?: Record<string, any> | null;
}

/**
 * Custom response for arbitrary JMAP method calls
 */
export interface CustomResponse extends ResponseWithAccount {
  data?: Record<string, any> | null;
}

/**
 * Create a custom method
 */
export function createCustomMethod(
  methodName: string,
  data?: Record<string, any>,
  using?: string[]
): CustomMethod {
  return {
    jmapMethod: methodName,
    using: using || [],
    data,
  };
}
