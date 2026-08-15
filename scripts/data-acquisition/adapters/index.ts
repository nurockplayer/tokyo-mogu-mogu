/**
 * Adapter registry for the acquisition layer (#175).
 *
 * One entry per implemented adapter. The sync engine resolves a source's
 * `adapterId` against this list; an unknown adapter id fails that source
 * loudly instead of silently producing nothing.
 */
import type { AcquisitionAdapter } from '../types.ts';
import { culturalPropertyAdapter } from './cultural-property/adapter.ts';
import { barrierFreeAdapter } from './barrier-free/adapter.ts';
import { omeFoodBusinessAdapter } from './ome-food-business/adapter.ts';

/** All registered adapters. */
export const ADAPTERS: AcquisitionAdapter[] = [
  culturalPropertyAdapter,
  barrierFreeAdapter,
  omeFoodBusinessAdapter,
];
