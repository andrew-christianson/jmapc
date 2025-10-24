// Client tests

import { Client } from '../src/client';
import { createEmailQuery } from '../src/methods/email';

describe('Client', () => {
  it('should create client with API token', () => {
    const client = Client.createWithApiToken('example.com', 'test-token');
    expect(client).toBeDefined();
  });

  it('should create client with password', () => {
    const client = Client.createWithPassword(
      'example.com',
      'user',
      'password'
    );
    expect(client).toBeDefined();
  });

  it('should create email query method', () => {
    const query = createEmailQuery({
      filter: { text: 'test' },
      accountId: 'account123',
    });

    expect(query.methodNamespace).toBe('Email');
    expect(query.methodType).toBe('query');
    expect(query.filter).toEqual({ text: 'test' });
  });
});
