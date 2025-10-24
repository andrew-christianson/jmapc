// JMAP session models

import * as constants from './constants';

/**
 * JMAP session
 */
export interface Session {
  username: string;
  apiUrl: string;
  downloadUrl: string;
  uploadUrl: string;
  eventSourceUrl: string;
  state: string;
  primaryAccounts: SessionPrimaryAccount;
  capabilities: SessionCapabilities;
}

/**
 * Session capabilities
 */
export interface SessionCapabilities {
  [constants.JMAP_URN_CORE]: SessionCapabilitiesCore;
  [key: string]: any; // Allow additional capability URNs
}

/**
 * Core session capabilities
 */
export interface SessionCapabilitiesCore {
  maxSizeUpload: number;
  maxConcurrentUpload: number;
  maxSizeRequest: number;
  maxConcurrentRequests: number;
  maxCallsInRequest: number;
  maxObjectsInGet: number;
  maxObjectsInSet: number;
  collationAlgorithms: string[];
}

/**
 * Primary accounts by capability URN
 */
export interface SessionPrimaryAccount {
  [constants.JMAP_URN_CORE]?: string | null;
  [constants.JMAP_URN_MAIL]?: string | null;
  [constants.JMAP_URN_SUBMISSION]?: string | null;
  [key: string]: string | null | undefined; // Allow additional URNs
}

/**
 * Get URNs from session capabilities
 */
export function getCapabilityUrns(capabilities: SessionCapabilities): string[] {
  return Object.keys(capabilities);
}
