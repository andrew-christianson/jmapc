// Core methods

import { JMAP_URN_CORE } from '../constants';
import { Method, Response } from './base';

/**
 * Core method base
 */
export interface CoreBase {
  using?: string[];
}

/**
 * Echo method type
 */
export interface EchoMethod {
  methodType: 'echo';
}

/**
 * Core/echo request
 */
export interface CoreEcho extends CoreBase, EchoMethod, Method {
  data?: Record<string, any> | null;
}

/**
 * Core/echo response
 */
export interface CoreEchoResponse extends CoreBase, EchoMethod, Response {
  data?: Record<string, any> | null;
}

/**
 * Create a Core/echo request
 */
export function createCoreEcho(data?: Record<string, any>): CoreEcho {
  return {
    methodNamespace: 'Core',
    methodType: 'echo',
    using: [JMAP_URN_CORE],
    data,
  };
}
