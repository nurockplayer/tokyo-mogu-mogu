import type {
  ProductReviewOutcome,
  StakeholderFieldResult,
} from './data-review-handoff';

export interface ProductReviewDraft {
  decisionId: string;
  reviewedAt: string;
  outcome: ProductReviewOutcome | '';
  note: string;
}

export interface StakeholderConfirmationDraft {
  reviewedAt: string;
  method: 'in_person' | 'phone' | 'direct_message' | 'email' | 'other' | '';
  authorityReference: string;
  results: Readonly<Record<string, StakeholderFieldResult>>;
}

export interface ReviewHandoffDraft {
  product: ProductReviewDraft;
  stakeholder: StakeholderConfirmationDraft;
}

export function emptyReviewHandoffDraft(): ReviewHandoffDraft {
  return {
    product: { decisionId: '', reviewedAt: '', outcome: '', note: '' },
    stakeholder: { reviewedAt: '', method: '', authorityReference: '', results: {} },
  };
}

export function isDirtyReviewHandoffDraft(draft: ReviewHandoffDraft): boolean {
  return Boolean(
    draft.product.decisionId || draft.product.reviewedAt || draft.product.outcome || draft.product.note.trim()
    || draft.stakeholder.reviewedAt || draft.stakeholder.method
    || draft.stakeholder.authorityReference.trim()
    || Object.keys(draft.stakeholder.results).length,
  );
}
