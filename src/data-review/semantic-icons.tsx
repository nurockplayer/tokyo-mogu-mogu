import type { ReactNode } from 'react';
import type { HumanDataReviewContext } from '../lib/human-data-review-board';

export type BoardIconRole =
  | 'identity'
  | 'business'
  | 'mobile-business'
  | 'location'
  | 'contact'
  | 'schedule'
  | 'price'
  | 'service'
  | 'source'
  | 'current-information'
  | 'verification'
  | 'info';

const FIELD_ICON_ROLES: Readonly<Record<string, BoardIconRole>> = {
  name: 'identity',
  venue_model: 'business',
  region_grouping: 'location',
  address: 'location',
  operating_area: 'location',
  access: 'location',
  coordinates: 'location',
  phone: 'contact',
  phone_hours: 'schedule',
  hours: 'schedule',
  schedule_guidance: 'schedule',
  schedule_url: 'current-information',
  schedule_conflict: 'schedule',
  seasonal_meeting_times: 'schedule',
  tour_duration: 'schedule',
  private_group_limit: 'service',
  closed_days: 'schedule',
  price_availability: 'price',
  service_availability: 'service',
  reservation: 'service',
  booking_destination: 'service',
  tour_availability: 'service',
  parking: 'location',
  multilingual_support: 'service',
  dietary_allergy: 'service',
  accessibility: 'service',
  official_current_url: 'source',
};

export function boardFieldIconRole(
  fieldKey: string,
  context?: Pick<HumanDataReviewContext, 'decisionItems' | 'reviewFocus' | 'productImpacts'>,
): BoardIconRole {
  const role = Object.prototype.hasOwnProperty.call(FIELD_ICON_ROLES, fieldKey)
    ? FIELD_ICON_ROLES[fieldKey]
    : undefined;
  if (fieldKey === 'venue_model' && context && (
    context.decisionItems.some((item) => item.kind === 'mobile_behavior')
    || context.reviewFocus.some((item) => item.id === 'mobile-venue-representation')
    || context.productImpacts.some((item) => item.id === 'no-fixed-location-behavior')
  )) return 'mobile-business';
  return role ?? 'info';
}

const ICON_PATHS: Readonly<Record<BoardIconRole, ReactNode>> = {
  identity: <><path d="M3 21h18"/><path d="M5 21V7l8-4 6 3v15"/><path d="M9 9h2m-2 4h2m4-4h1m-1 4h1"/></>,
  business: <><path d="M3 10h18l-2-6H5z"/><path d="M5 10v11h14V10M9 21v-7h6v7"/><path d="M3 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/></>,
  'mobile-business': <><path d="M3 7h12v11H3z"/><path d="M15 11h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 10h6m-6 3h4"/></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  contact: <><path d="M6 3h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 1-1 2-2 2C10 19 5 14 4 6c0-2 1-3 2-3Z"/></>,
  schedule: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  price: <><path d="M5 4h14l-2 5H7zM7 9l2 11m8-11-2 11m-9-6h12"/><path d="M10 7l2 3 2-3m-2 3v6"/></>,
  service: <><path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18"/><path d="M17 3v18m0-18c3 2 3 7 0 9"/></>,
  source: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18"/></>,
  'current-information': <><path d="M4 5h16v12H7l-3 3z"/><path d="M8 9h8m-8 4h5"/></>,
  verification: <><path d="M12 3 20 6v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 9h6m-6 4h6"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
};

export function BoardSemanticIcon({ role, className }: { role: BoardIconRole; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-icon-role={role}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {ICON_PATHS[role]}
    </svg>
  );
}
