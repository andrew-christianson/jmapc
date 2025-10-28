// JMAP error types

/**
 * Base error class for JMAP errors
 */
export class JMAPError extends Error {
  type: string;

  constructor(type: string, message?: string) {
    super(message || type);
    this.name = 'JMAPError';
    this.type = type;
  }

  static fromDict(data: any): JMAPError {
    const type = data.type;
    const ErrorClass = ERROR_TYPE_MAP[type] || JMAPError;
    return new ErrorClass(data);
  }
}

export class AccountNotFound extends JMAPError {
  constructor(data?: any) {
    super('accountNotFound', data?.description);
    this.name = 'AccountNotFound';
  }
}

export class AccountNotSupportedByMethod extends JMAPError {
  constructor(data?: any) {
    super('accountNotSupportedByMethod', data?.description);
    this.name = 'AccountNotSupportedByMethod';
  }
}

export class AccountReadOnly extends JMAPError {
  constructor(data?: any) {
    super('accountReadOnly', data?.description);
    this.name = 'AccountReadOnly';
  }
}

export class CannotCalculateChanges extends JMAPError {
  constructor(data?: any) {
    super('cannotCalculateChanges', data?.description);
    this.name = 'CannotCalculateChanges';
  }
}

export class InvalidArguments extends JMAPError {
  arguments?: string[];
  description?: string;

  constructor(data?: any) {
    super('invalidArguments', data?.description);
    this.name = 'InvalidArguments';
    this.arguments = data?.arguments;
    this.description = data?.description;
  }
}

export class InvalidResultReference extends JMAPError {
  constructor(data?: any) {
    super('invalidResultReference', data?.description);
    this.name = 'InvalidResultReference';
  }
}

export class Forbidden extends JMAPError {
  constructor(data?: any) {
    super('forbidden', data?.description);
    this.name = 'Forbidden';
  }
}

export class RequestTooLarge extends JMAPError {
  constructor(data?: any) {
    super('requestTooLarge', data?.description);
    this.name = 'RequestTooLarge';
  }
}

export class ServerFail extends JMAPError {
  description?: string;

  constructor(data?: any) {
    super('serverFail', data?.description);
    this.name = 'ServerFail';
    this.description = data?.description;
  }
}

export class ServerPartialFail extends JMAPError {
  constructor(data?: any) {
    super('serverPartialFail', data?.description);
    this.name = 'ServerPartialFail';
  }
}

export class ServerUnavailable extends JMAPError {
  constructor(data?: any) {
    super('serverUnavailable', data?.description);
    this.name = 'ServerUnavailable';
  }
}

export class UnknownMethod extends JMAPError {
  constructor(data?: any) {
    super('unknownMethod', data?.description);
    this.name = 'UnknownMethod';
  }
}

export class UnsupportedFilter extends JMAPError {
  constructor(data?: any) {
    super('unsupportedFilter', data?.description);
    this.name = 'UnsupportedFilter';
  }
}

// Map of error types to error classes
const ERROR_TYPE_MAP: Record<string, new (data?: any) => JMAPError> = {
  accountNotFound: AccountNotFound,
  accountNotSupportedByMethod: AccountNotSupportedByMethod,
  accountReadOnly: AccountReadOnly,
  cannotCalculateChanges: CannotCalculateChanges,
  invalidArguments: InvalidArguments,
  invalidResultReference: InvalidResultReference,
  forbidden: Forbidden,
  requestTooLarge: RequestTooLarge,
  serverFail: ServerFail,
  serverPartialFail: ServerPartialFail,
  serverUnavailable: ServerUnavailable,
  unknownMethod: UnknownMethod,
  unsupportedFilter: UnsupportedFilter,
};
