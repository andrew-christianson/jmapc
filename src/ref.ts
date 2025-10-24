// Reference types for JMAP method chaining

export const REF_SENTINEL_KEY = '__ref';

/**
 * ResultReference represents a reference to a previous method call result
 */
export interface ResultReference {
  name: string;
  path: string;
  resultOf: string;
  [REF_SENTINEL_KEY]?: 'ResultReference';
}

/**
 * Ref represents a reference to a previous method call by index or ID
 */
export interface Ref {
  path: string;
  method: string | number;
  [REF_SENTINEL_KEY]?: 'Ref';
}

/**
 * Create a new ResultReference
 */
export function createResultReference(
  name: string,
  path: string,
  resultOf: string
): ResultReference {
  return {
    name,
    path,
    resultOf,
    [REF_SENTINEL_KEY]: 'ResultReference',
  };
}

/**
 * Create a new Ref
 */
export function createRef(path: string, method: string | number = -1): Ref {
  return {
    path,
    method,
    [REF_SENTINEL_KEY]: 'Ref',
  };
}

/**
 * Check if a value is a ResultReference
 */
export function isResultReference(value: any): value is ResultReference {
  return (
    value &&
    typeof value === 'object' &&
    value[REF_SENTINEL_KEY] === 'ResultReference'
  );
}

/**
 * Check if a value is a Ref
 */
export function isRef(value: any): value is Ref {
  return (
    value && typeof value === 'object' && value[REF_SENTINEL_KEY] === 'Ref'
  );
}

/**
 * Check if a value is any kind of reference
 */
export function isReference(value: any): value is ResultReference | Ref {
  return isResultReference(value) || isRef(value);
}
