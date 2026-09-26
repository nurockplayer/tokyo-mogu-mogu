/** Repository review progress stores identity and outcome metadata only. */
export type ConfirmationReviewOutcome =
  | 'confirmed'
  | 'correction_required'
  | 'unknown'
  | 'not_applicable';

export type ConfirmationMethod = 'in_person' | 'phone' | 'direct_message' | 'email' | 'other';

export interface ConfirmationReviewProgressRecord {
  entityType: 'Spot' | 'Story' | 'Route';
  entityId: string;
  fieldKey: string;
  claimIds: readonly string[];
  outcome: ConfirmationReviewOutcome;
  reviewedAt: string;
  method: ConfirmationMethod;
  authorityReference?: string;
  fingerprintVersion: 'sha256-v1';
  fingerprint: string;
}

/** No confirmation-progress receipts are recorded here; genuine entries require a reviewed stakeholder handoff. */
export const CONFIRMATION_REVIEW_PROGRESS: readonly ConfirmationReviewProgressRecord[] = [];
