// Search snippet models

/**
 * Search snippet (context from search results)
 */
export interface SearchSnippet {
  emailId: string;
  subject?: string | null;
  preview?: string | null;
}
