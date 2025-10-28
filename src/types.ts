// Common type utilities

import { Ref, ResultReference } from './ref';

// Type aliases for union types with references
export type StrOrRef = string | ResultReference | Ref;
export type ListOrRef<T> = T[] | ResultReference | Ref;
export type TypeOrRef<T> = T | ResultReference | Ref;

// Enum for operators
export enum Operator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

// Convert camelCase to snake_case
export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// Convert snake_case to camelCase
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Convert object keys to camelCase
export function keysToCamel(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(keysToCamel);
  }
  if (typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.startsWith('#') ? key : toCamelCase(key);
      result[camelKey] = keysToCamel(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

// Convert object keys to snake_case (for JSON serialization)
export function keysToSnake(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(keysToSnake);
  }
  if (typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      // Keep keys starting with # as-is, convert others
      const snakeKey = key.startsWith('#') ? key : toSnakeCase(key);
      result[snakeKey] = keysToSnake(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

// Remove undefined/null values from object
export function removeNullish(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(removeNullish);
  }
  if (typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        result[key] = removeNullish(value);
      }
      return result;
    }, {} as any);
  }
  return obj;
}

// Date/time encoding
export function encodeDateTime(date: Date): string {
  return date.toISOString();
}

// Date/time decoding
export function decodeDateTime(value: string | null | undefined): Date | null {
  if (!value) {
    return null;
  }
  return new Date(value);
}
