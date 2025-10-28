// Identity models

import { EmailAddress } from './common';

/**
 * Email identity
 */
export interface Identity {
  id?: string | null;
  name: string;
  email: string;
  replyTo?: string | null;
  bcc?: EmailAddress[] | null;
  textSignature?: string | null;
  htmlSignature?: string | null;
  mayDelete: boolean;
}
