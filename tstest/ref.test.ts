// Reference tests

import {
  createRef,
  createResultReference,
  isRef,
  isResultReference,
  isReference,
} from '../src/ref';

describe('References', () => {
  describe('createResultReference', () => {
    it('should create a result reference', () => {
      const ref = createResultReference('Email/get', '/list/0/id', 'call1');

      expect(ref.name).toBe('Email/get');
      expect(ref.path).toBe('/list/0/id');
      expect(ref.resultOf).toBe('call1');
    });
  });

  describe('createRef', () => {
    it('should create a ref with default method', () => {
      const ref = createRef('/list/*/id');

      expect(ref.path).toBe('/list/*/id');
      expect(ref.method).toBe(-1);
    });

    it('should create a ref with specified method', () => {
      const ref = createRef('/list/*/id', 'call1');

      expect(ref.path).toBe('/list/*/id');
      expect(ref.method).toBe('call1');
    });
  });

  describe('isResultReference', () => {
    it('should identify result references', () => {
      const ref = createResultReference('Email/get', '/list/0/id', 'call1');
      expect(isResultReference(ref)).toBe(true);

      const notRef = { name: 'test' };
      expect(isResultReference(notRef)).toBe(false);
    });
  });

  describe('isRef', () => {
    it('should identify refs', () => {
      const ref = createRef('/list/*/id');
      expect(isRef(ref)).toBe(true);

      const notRef = { path: 'test' };
      expect(isRef(notRef)).toBe(false);
    });
  });

  describe('isReference', () => {
    it('should identify any reference type', () => {
      const resultRef = createResultReference(
        'Email/get',
        '/list/0/id',
        'call1'
      );
      const ref = createRef('/list/*/id');

      expect(isReference(resultRef)).toBe(true);
      expect(isReference(ref)).toBe(true);
      expect(isReference({})).toBe(false);
    });
  });
});
