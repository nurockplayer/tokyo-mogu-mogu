/**
 * Locale-aware date and number formatting built on the Intl API.
 *
 * `formatDate` renders date-only ISO strings (and Date objects) in the given
 * locale. Dates are formatted in UTC so a date-only value like `2026-08-08`
 * never shifts to a neighbouring calendar day in the user's timezone.
 *
 * `formatNumber` renders numbers with the locale's grouping/separators.
 */
import type { Locale } from './i18n/resources';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
};

const dateFormatters = new Map<string, Intl.DateTimeFormat>();

function dateFormatter(locale: string): Intl.DateTimeFormat {
  let formatter = dateFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, DATE_OPTIONS);
    dateFormatters.set(locale, formatter);
  }
  return formatter;
}

/**
 * Format a date-only ISO string or Date for the given locale. Returns an empty
 * string when the input cannot be parsed so callers never render "Invalid Date".
 */
export function formatDate(isoOrDate: string | Date, locale: Locale): string {
  const date = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return dateFormatter(locale).format(date);
}

/**
 * Format a number with locale-aware grouping and decimal separators.
 */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale).format(value);
}
