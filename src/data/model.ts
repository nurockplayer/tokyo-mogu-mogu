/**
 * Core data model for Tokyo Mogu Mogu.
 *
 * This file is the shared contract for all features (Pokédex, detail page,
 * map, check-in, persistence). Keep it free of framework dependencies and
 * changes here must be coordinated across the parallel feature work.
 */

/** A single source of information behind a food culture or a place. */
export interface DataSource {
  /** Source name, e.g. "Okutama Tourism Association" or "Tokyo Metropolitan Government". */
  name: string;
  /** Source URL or dataset identifier when one exists. */
  url?: string;
  /** License or usage constraints when relevant. */
  license?: string;
  /** Retrieval or last-verified date (ISO 8601, e.g. "2026-08-08"). */
  lastVerified?: string;
  /** How the data was obtained: an open-data portal, fieldwork, an official website, or manual entry. */
  sourceType?: 'open_data' | 'fieldwork' | 'official_web' | 'manual';
  /** Identifier of the source dataset (e.g. a CKAN dataset id) when applicable. */
  sourceDatasetId?: string;
  /** Retrieval date (ISO 8601, e.g. "2026-08-08"). */
  retrievedAt?: string;
  /** Identifier of the record within its original source dataset. */
  originalId?: string;
}

export type DataOrigin =
  /** Data from a verified external source. */
  | 'source'
  /** Team-authored editorial content (story, tips). */
  | 'editorial'
  /** Temporary fixture used for the demo, not real-world data. */
  | 'demo';

/** How a food culture is unlocked during the MVP. */
export type UnlockMethod = 'location-checkin';

/** Category buckets shown in the Pokédex. */
export type FoodCultureCategory =
  | 'produce'
  | 'seafood'
  | 'sweets'
  | 'processed-food'
  | 'craft';

/** Tama areas referenced by the seed data. */
export type TamaArea = 'okutama' | 'ome' | 'hamura' | 'akiruno' | 'hinode';

/**
 * A collectible food culture: a Tama local food, product, or regional culture
 * that a user discovers, learns about, and collects by visiting in person.
 */
export interface FoodCulture {
  /** Stable identifier, e.g. "wasabi-okutama". */
  id: string;
  nameJa: string;
  nameEn: string;
  /** Main category shown as a badge in the Pokédex. */
  category: FoodCultureCategory;
  /** Primary area. */
  area: TamaArea;
  /** One-to-two sentence summary shown on cards. */
  descriptionJa: string;
  descriptionEn: string;
  /** Longer narrative for the detail page. */
  storyJa: string;
  storyEn: string;
  /** Region / history narrative. */
  historyJa: string;
  historyEn: string;
  /** Producer or maker story. */
  makerJa: string;
  makerEn: string;
  /** How to eat or enjoy it. */
  howToEnjoyJa: string;
  howToEnjoyEn: string;
  /** Image key; the app resolves it to a bundled asset or placeholder. */
  image: string;
  /** Hint shown for locked items that leads to the next exploration. */
  hintJa: string;
  hintEn: string;
  /** Places where this food culture can be experienced. */
  placeIds: string[];
  /** How this collectible is unlocked. */
  unlockMethod: UnlockMethod;
  /** Provenance: sources behind this entry, or demo/editorial markers. */
  sources: DataSource[];
  /** Whether this entry is real source data, editorial, or a demo fixture. */
  origin: DataOrigin;
}

export type PlaceType = 'shop' | 'restaurant' | 'farm' | 'brewery' | 'info-center' | 'other';

/**
 * A physical place where a user can experience one or more food cultures
 * (shop, restaurant, farm, brewery, information center, ...).
 */
export interface Place {
  /** Stable identifier, e.g. "place-wasabi-farm". */
  id: string;
  nameJa: string;
  nameEn: string;
  address: string;
  latitude: number;
  longitude: number;
  /** Food cultures that can be experienced here. */
  foodCultureIds: string[];
  type: PlaceType;
  /** Provenance: source behind this place. */
  source: DataSource;
  /** Whether this entry is real source data, editorial, or a demo fixture. */
  origin: DataOrigin;
}

/** Distance check used for location-based check-in (meters). */
export const UNLOCK_RADIUS_METERS = 500;
