// API tests

import { createAPIRequest } from '../src/api';
import { createCoreEcho } from '../src/methods/core';
import { createEmailQuery } from '../src/methods/email';

describe('API', () => {
  it('should create API request from single method', () => {
    const method = createCoreEcho({ test: 'data' });
    const request = createAPIRequest('account123', method);

    expect(request.using).toContain('urn:ietf:params:jmap:core');
    expect(request.methodCalls.length).toBe(1);
    expect(request.methodCalls[0][0]).toBe('Core/echo');
  });

  it('should create API request from multiple methods', () => {
    const methods = [
      createCoreEcho({ test: 'data' }),
      createEmailQuery({ filter: { text: 'test' } }),
    ];

    const request = createAPIRequest('account123', methods);

    expect(request.using).toContain('urn:ietf:params:jmap:core');
    expect(request.using).toContain('urn:ietf:params:jmap:mail');
    expect(request.methodCalls.length).toBe(2);
  });

  it('should set account ID on methods', () => {
    const method = createEmailQuery({ filter: { text: 'test' } });
    const request = createAPIRequest('account123', method);

    expect(request.methodCalls[0][1].account_id).toBe('account123');
  });
});
