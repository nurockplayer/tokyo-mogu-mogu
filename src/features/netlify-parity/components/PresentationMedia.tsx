import type { Locale } from '../../../i18n';
import { referenceAssets, type ReferenceAssetId } from '../content';

const unavailableLabel: Record<Locale, string> = {
  ja: '現地写真は準備中です',
  en: 'Venue photography is not yet available',
  'zh-TW': '現地照片尚未提供',
};

export interface PresentationMediaProps {
  assetId?: ReferenceAssetId;
  alt?: string;
  className?: string;
  locale: Locale;
}

/**
 * Preserve the current Figma media geometry without borrowing unrelated or
 * unlicensed photography when a journey has no repository-owned asset.
 */
export function PresentationMedia({
  assetId,
  alt = '',
  className,
  locale,
}: PresentationMediaProps) {
  if (assetId) {
    return <img className={className} src={referenceAssets[assetId]} alt={alt} />;
  }

  return (
    <div
      className={`presentation-media-empty${className ? ` ${className}` : ''}`}
      data-media-state="unavailable"
      role="img"
      aria-label={unavailableLabel[locale]}
    >
      <span>{unavailableLabel[locale]}</span>
    </div>
  );
}
