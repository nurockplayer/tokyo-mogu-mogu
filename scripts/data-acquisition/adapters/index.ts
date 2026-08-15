/**
 * Adapter registry for the acquisition layer (#175).
 *
 * One entry per implemented adapter. The sync engine resolves a source's
 * `adapterId` against this list; an unknown adapter id fails that source
 * loudly instead of silently producing nothing.
 *
 * The ODS 文化財一覧 pattern (東京都 + 市町村) is handled by the single reusable
 * `ods-cultural-property` adapter; per-municipality differences live in its
 * config registry (`adapters/ods-cultural-property/config.ts`), not here.
 */
import type { AcquisitionAdapter } from '../types.ts';
import { odsCulturalPropertyAdapter } from './ods-cultural-property/adapter.ts';
import { barrierFreeAdapter } from './barrier-free/adapter.ts';
import { omeFoodBusinessAdapter } from './ome-food-business/adapter.ts';

/** All registered adapters. */
export const ADAPTERS: AcquisitionAdapter[] = [
  odsCulturalPropertyAdapter,
  barrierFreeAdapter,
  omeFoodBusinessAdapter,
];
