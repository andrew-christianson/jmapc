// Type utility tests

import {
  toCamelCase,
  toSnakeCase,
  keysToCamel,
  keysToSnake,
  removeNullish,
} from '../src/types';

describe('Type utilities', () => {
  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('test_case_value')).toBe('testCaseValue');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('testCaseValue')).toBe('test_case_value');
    });
  });

  describe('keysToCamel', () => {
    it('should convert object keys to camelCase', () => {
      const obj = {
        hello_world: 'test',
        another_key: 'value',
      };

      const result = keysToCamel(obj);
      expect(result.helloWorld).toBe('test');
      expect(result.anotherKey).toBe('value');
    });

    it('should handle nested objects', () => {
      const obj = {
        outer_key: {
          inner_key: 'value',
        },
      };

      const result = keysToCamel(obj);
      expect(result.outerKey.innerKey).toBe('value');
    });

    it('should preserve # prefixed keys', () => {
      const obj = {
        '#resultOf': 'test',
        normal_key: 'value',
      };

      const result = keysToCamel(obj);
      expect(result['#resultOf']).toBe('test');
      expect(result.normalKey).toBe('value');
    });
  });

  describe('keysToSnake', () => {
    it('should convert object keys to snake_case', () => {
      const obj = {
        helloWorld: 'test',
        anotherKey: 'value',
      };

      const result = keysToSnake(obj);
      expect(result.hello_world).toBe('test');
      expect(result.another_key).toBe('value');
    });
  });

  describe('removeNullish', () => {
    it('should remove null and undefined values', () => {
      const obj = {
        defined: 'value',
        nullValue: null,
        undefinedValue: undefined,
        zero: 0,
        empty: '',
      };

      const result = removeNullish(obj);
      expect(result.defined).toBe('value');
      expect(result.nullValue).toBeUndefined();
      expect(result.undefinedValue).toBeUndefined();
      expect(result.zero).toBe(0);
      expect(result.empty).toBe('');
    });
  });
});
