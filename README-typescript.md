# jmapc TypeScript Implementation

This is a TypeScript reimplementation of the jmapc library, a [JMAP](https://jmap.io) client library.

## Project Structure

```
src/                    - TypeScript source code
  ├── client.ts        - Main client class
  ├── api.ts           - API request/response layer
  ├── models/          - Data models
  ├── methods/         - JMAP method definitions
  ├── fastmail/        - Fastmail extensions
  ├── errors.ts        - Error types
  ├── ref.ts           - Reference system
  ├── session.ts       - Session management
  ├── types.ts         - Type utilities
  └── constants.ts     - Constants

tstest/                - Test files
dist/                  - Compiled JavaScript (generated)
```

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Testing

```bash
npm test
```

## Usage

```typescript
import { Client, createEmailQuery, createEmailGet } from 'jmapc';

// Create client with API token
const client = Client.createWithApiToken('mail.example.com', 'your-token');

// Query emails
const query = createEmailQuery({
  filter: { text: 'important' },
});

const queryResponse = await client.request(query, { raiseErrors: true });

// Get email details
const emailIds = (queryResponse as any).ids;
const emailGet = createEmailGet({ ids: emailIds });

const emails = await client.request(emailGet, { raiseErrors: true });
console.log(emails);
```

## Features

- Full TypeScript type safety
- Support for all JMAP core methods
- Email, Mailbox, Identity, Thread, EmailSubmission, SearchSnippet methods
- Fastmail MaskedEmail extension
- Event streaming support
- File upload/download
- Reference chaining between method calls

## Differences from Python Implementation

The TypeScript implementation follows the same architecture as the Python version but uses TypeScript idioms:

- Interfaces instead of dataclasses
- Async/await for all I/O operations
- Axios for HTTP requests
- EventSource for server-sent events
- Built-in type checking via TypeScript compiler

## Development

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## License

GPL-3.0-or-later
