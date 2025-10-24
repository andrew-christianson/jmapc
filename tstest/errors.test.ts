// Error tests

import {
  JMAPError,
  ServerFail,
  InvalidArguments,
  AccountNotFound,
} from '../src/errors';

describe('Errors', () => {
  it('should create JMAPError', () => {
    const error = new JMAPError('testError', 'Test message');
    expect(error.type).toBe('testError');
    expect(error.message).toBe('Test message');
  });

  it('should create ServerFail error', () => {
    const error = new ServerFail({ description: 'Server failed' });
    expect(error.type).toBe('serverFail');
    expect(error.description).toBe('Server failed');
  });

  it('should create InvalidArguments error', () => {
    const error = new InvalidArguments({
      arguments: ['arg1', 'arg2'],
      description: 'Invalid',
    });
    expect(error.type).toBe('invalidArguments');
    expect(error.arguments).toEqual(['arg1', 'arg2']);
  });

  it('should create AccountNotFound error', () => {
    const error = new AccountNotFound();
    expect(error.type).toBe('accountNotFound');
  });

  it('should deserialize error from dict', () => {
    const data = {
      type: 'serverFail',
      description: 'Test error',
    };

    const error = JMAPError.fromDict(data);
    expect(error).toBeInstanceOf(ServerFail);
    expect(error.type).toBe('serverFail');
  });
});
