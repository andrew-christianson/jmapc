// Event models for server-sent events

/**
 * Type state for an account
 */
export interface TypeState {
  CalendarEvent?: string | null;
  Mailbox?: string | null;
  Email?: string | null;
  EmailDelivery?: string | null;
  Thread?: string | null;
}

/**
 * State change event
 */
export interface StateChange {
  changed: Record<string, TypeState>;
  type?: string | null;
}

/**
 * Event from event source
 */
export interface Event {
  id?: string | null;
  data: StateChange;
}
