/**
 * Core data model for Tokyo Mogu Mogu.
 *
 * This file is the shared contract for all features (Pokédex, detail page,
 * map, check-in, persistence). Keep it free of framework dependencies and
 * changes here must be coordinated across the parallel feature work.
 */

/**
 * Stakeholder verification state of a source (Issue #129).
 *
 * This is a per-source status: what degree of confirmation stands behind the
 * source's facts. It is distinct from `DataOrigin` (source / editorial / demo)
 * and from freshness: a `verified` source can still be `stale`, and a fresh
 * source can still need confirmation. Absence means "unspecified" — derive a
 * safe default with `deriveVerificationStatus` instead of treating it as
 * verified.
 */
export type VerificationStatus =
  | 'verified'
  | 'needs_confirmation'
  | 'stale'
  | 'conflict'
  | 'demo';

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
  /**
   * How the data was obtained: an open-data portal, fieldwork, an official
   * website, a business's own site / direct confirmation, a manual entry, or a
   * demo fixture (Issue #129).
   */
  sourceType?: 'open_data' | 'fieldwork' | 'official_web' | 'business' | 'manual' | 'demo';
  /** Identifier of the source dataset (e.g. a CKAN dataset id) when applicable. */
  sourceDatasetId?: string;
  /** Retrieval date (ISO 8601, e.g. "2026-08-08"). */
  retrievedAt?: string;
  /** The source document's own last-updated date (ISO 8601, e.g. "2026-08-08").
   *  NOT the record's real-world freshness: a catalog `modified` date must not
   *  be treated as when the underlying facts were last true (Issue #129). */
  sourceUpdatedAt?: string;
  /** Stakeholder / team confirmation date (ISO 8601, e.g. "2026-08-08"). */
  confirmedAt?: string;
  /** Stakeholder verification status (Issue #129). Absent ⇒ unspecified. */
  verificationStatus?: VerificationStatus;
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

/** Stable identifier for a Tokyo region. */
export type RegionId = string;

/**
 * A collectible food culture: a Tokyo local food, product, or regional culture
 * that a user discovers, learns about, and collects by visiting in person.
 */
export interface FoodCulture {
  /** Stable identifier, e.g. "wasabi-okutama". */
  id: string;
  nameJa: string;
  nameEn: string;
  /** Main category shown as a badge in the Pokédex. */
  category: FoodCultureCategory;
  /** Primary region. */
  area: RegionId;
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

export type PlaceType = 'shop' | 'restaurant' | 'food-truck' | 'farm' | 'brewery' | 'info-center' | 'other';

export interface PlaceBusinessHours {
  opens: string;
  closes: string;
  /** Last-order time when the operator publishes one separately from closing. */
  lastOrder?: string;
}

export interface PlaceBusinessHourSchedule extends PlaceBusinessHours {
  /** Stable schedule bucket; localized labels belong in presentation code. */
  id: 'weekday' | 'weekend-holiday';
}

export interface PlaceMealHourSchedule {
  /** Stable meal period; localized labels belong in presentation code. */
  id: 'lunch' | 'dinner';
  opens: string;
  /** The operator publishes last order without asserting a closing time. */
  lastOrder: string;
}

export type PlaceWeekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface PlaceParkingInformation {
  available: boolean;
  spaces?: number;
  largeVehicles?: boolean;
  nearbyPaidParking?: boolean;
}

export interface PlaceMenuListing {
  /** Stable repository identity for one source-listed product. */
  id: string;
  nameJa: string;
  listedPriceYen?: number;
  /** Stable option identities; availability remains governed by source verification. */
  flavorIds?: string[];
  source: DataSource;
}

export interface PlaceSourceConflictStatement {
  /** Stable statement identity within the canonical Place record. */
  id: string;
  /** Source wording retained without selecting or normalizing one variant. */
  value: string;
  source: DataSource;
}

export interface PlacePhoneSourceStatement {
  /** Stable source-statement identity; duplicate numbers remain separately traceable. */
  id: string;
  number: string;
  role: 'reservation_desk' | 'reservation_inquiry';
  scope: 'shared_business_group' | 'related_business';
  /** Whether the source explicitly establishes routing for this Place. */
  placeRoutingStatus: 'explicit' | 'unresolved';
  source: DataSource;
}

/** Optional visitor-facing operational facts kept on the canonical Place. */
export interface PlaceVisitorInformation {
  phone?: string;
  shopHours?: PlaceBusinessHours;
  /** Multiple source-published schedules when one all-days interval would lose meaning. */
  shopHourSchedules?: PlaceBusinessHourSchedule[];
  /** Meal periods where the operator publishes opening and last-order times only. */
  mealHourSchedules?: PlaceMealHourSchedule[];
  phoneHours?: PlaceBusinessHours & {
    unavailableOn: Array<'sunday' | 'public_holiday'>;
  };
  access?: {
    stationJa: string;
    walkMinutes: number;
  };
  regularClosedDays?: PlaceWeekday[];
  /** The operator publishes no regular closure while warning that irregular closures occur. */
  irregularClosures?: boolean;
  /** The operator explicitly describes the Place as open daily. */
  openDaily?: boolean;
  parking?: PlaceParkingInformation;
  /** Stable product-category IDs; localized presentation copy is derived elsewhere. */
  productCategories?: string[];
  /** Stable service-category IDs; localized presentation copy is derived elsewhere. */
  serviceCategories?: string[];
  /** Source-backed reservation guidance without inventing a booking destination. */
  reservationPolicy?: {
    requirement: 'recommended';
    reasonIds: Array<'limited-seating' | 'busy-periods-may-fill'>;
  };
  /** Source-listed products whose provenance differs from the Place's primary page. */
  menuListings?: PlaceMenuListing[];
  /** Explicit unresolved closure statements from first-party sources. */
  yearEndClosure?: {
    verificationStatus: 'conflict';
    statements: PlaceSourceConflictStatement[];
  };
  /** Explicit unresolved phone statements from first-party sources. */
  phoneConflict?: {
    verificationStatus: 'conflict';
    statements: PlacePhoneSourceStatement[];
  };
}

export interface PlaceMobileVenue {
  /** The operator explicitly states that the venue has no permanent storefront. */
  noFixedStorefront: true;
  /** Broad source-published operating area; never a substitute address. */
  primaryOperatingAreaJa: string;
  /** Stable qualitative pattern only; exact dates belong to the current schedule source. */
  operatingPattern: 'mainly-weekends';
  /** Conditions that make a published schedule non-guaranteed. */
  scheduleVariability: Array<'published-schedule' | 'weather' | 'sell-out'>;
  /** First-party destination for the currently published operating schedule. */
  currentScheduleSource: DataSource;
  /** Explicit unresolved schedule statements from first-party sources. */
  scheduleConflict?: {
    verificationStatus: 'conflict';
    statements: PlaceSourceConflictStatement[];
  };
}

/**
 * A venue where a user can experience one or more food cultures. Fixed venues
 * carry an address and coordinates; mobile venues explicitly omit them.
 */
interface PlaceBase {
  /** Stable identifier, e.g. "place-wasabi-farm". */
  id: string;
  nameJa: string;
  nameEn: string;
  /**
   * Coordinate precision (Issue #127). 'precise' = field-verified / precise OSM
   * point; 'approximate' = district centroid, usable for map display but never
   * as a turn-by-turn navigation destination (the app uses the sourced
   * name/address for directions instead). Absent ⇒ unspecified (treated as
   * coordinate-based by the map-link helpers).
  */
  coordinatePrecision?: 'precise' | 'approximate';
  /** Optional provenance for coordinates when it differs from the place source. */
  coordinateSource?: DataSource;
  /** Optional address provenance when it differs from the Place's primary source. */
  addressSource?: DataSource;
  /** Food cultures that can be experienced here. */
  foodCultureIds: string[];
  type: PlaceType;
  /** Provenance: source behind this place. */
  source: DataSource;
  /** Structured operational facts from the same canonical Place authority. */
  visitorInformation?: PlaceVisitorInformation;
  /** Whether this entry is real source data, editorial, or a demo fixture. */
  origin: DataOrigin;
}

export interface FixedPlace extends PlaceBase {
  locationKind?: 'fixed';
  address: string;
  latitude: number;
  longitude: number;
  mobileVenue?: never;
}

export interface MobilePlace extends PlaceBase {
  locationKind: 'mobile';
  address?: never;
  latitude?: never;
  longitude?: never;
  coordinatePrecision?: never;
  coordinateSource?: never;
  addressSource?: never;
  mobileVenue: PlaceMobileVenue;
}

export type Place = FixedPlace | MobilePlace;

export function isFixedPlace(place: Place): place is FixedPlace {
  return place.locationKind !== 'mobile';
}

/** Distance check used for location-based check-in (meters). */
export const UNLOCK_RADIUS_METERS = 500;
