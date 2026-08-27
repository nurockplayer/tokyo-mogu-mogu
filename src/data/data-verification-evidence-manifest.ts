export type DataVerificationEvidenceKind = 'source' | 'app' | 'fieldwork';
export type DataVerificationEvidenceLocale = 'ja' | 'en' | 'zh-TW';

interface DataVerificationEvidenceBase {
  evidenceId: string;
  claimIds: readonly string[];
  entityId: string;
  capturedAt: string;
  path: string;
  note?: string;
}

export interface DataVerificationSourceEvidence extends DataVerificationEvidenceBase {
  kind: 'source';
  sourceUrl: string;
}

export interface DataVerificationAppEvidence extends DataVerificationEvidenceBase {
  kind: 'app';
  locale: DataVerificationEvidenceLocale;
  viewport: {
    width: number;
    height?: number;
  };
  appCommit?: string;
}

export interface DataVerificationFieldworkEvidence extends DataVerificationEvidenceBase {
  kind: 'fieldwork';
}

export type DataVerificationEvidence =
  | DataVerificationSourceEvidence
  | DataVerificationAppEvidence
  | DataVerificationFieldworkEvidence;

export interface DataVerificationEvidenceOmission {
  omissionId: string;
  claimIds: readonly string[];
  entityId: string;
  kind: 'source';
  sourceUrl: string;
  recordedAt: string;
  reason: string;
}

export interface DataVerificationEvidenceManifest {
  evidence: readonly DataVerificationEvidence[];
  omissions: readonly DataVerificationEvidenceOmission[];
}

/**
 * Review evidence only. Entries reference #333 claim IDs and never duplicate or
 * alter canonical/displayed factual values, provenance, or verification state.
 */
export const DATA_VERIFICATION_EVIDENCE_MANIFEST: DataVerificationEvidenceManifest = {
  evidence: [
    {
      evidenceId: 'okutama-tourism-office-app-ja-375',
      claimIds: [
        'place:okutama-tourism-office:information_name:ja',
        'place:okutama-tourism-office:address:ja',
        'place:okutama-tourism-office:phone:ja',
        'spot:okutama-tourism-office:presentation:verification_note:ja',
      ],
      entityId: 'okutama-tourism-office',
      kind: 'app',
      capturedAt: '2026-08-27',
      path: 'docs/data-evidence/okutama-tourism-office/app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      appCommit: 'e79899dd600cbd6c56e287207f8223970e62a528',
      note: 'Current post-PR #335 Spot practical-information state at the 375px baseline.',
    },
  ],
  omissions: [
    {
      omissionId: 'okutama-tourism-office-source-rights-restricted',
      claimIds: [
        'place:okutama-tourism-office:address:ja',
        'place:okutama-tourism-office:phone:ja',
      ],
      entityId: 'okutama-tourism-office',
      kind: 'source',
      sourceUrl: 'https://www.okutama.gr.jp/site/',
      recordedAt: '2026-08-27',
      reason: 'The repository source record is All Rights Reserved and permits reference use only; copying an official-site screenshot into the repository is not reasonably supportable.',
    },
  ],
};
