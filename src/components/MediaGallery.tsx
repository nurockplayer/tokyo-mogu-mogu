import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import type { FieldworkMedia } from '../data/fieldwork-media';
import { fieldworkMediaSrcSet, fieldworkMediaText } from '../data/fieldwork-media';
import { useI18n } from '../i18n';
import { fillTemplate } from '../lib/exploration';
import './MediaGallery.css';

interface MediaGalleryProps {
  media: readonly FieldworkMedia[];
  label: string;
  testId?: string;
  className?: string;
}

interface DragState {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Accessible native-scroll gallery used by matching Story/Route/Spot media. */
export function MediaGallery({ media, label, testId, className = '' }: MediaGalleryProps) {
  const { locale, t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const scrollFrameRef = useRef(0);
  const safeIndex = Math.min(activeIndex, Math.max(media.length - 1, 0));

  useEffect(() => {
    return () => window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  if (media.length === 0) return null;

  const goTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), media.length - 1);
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children.item(next) as HTMLElement | null;
    track.scrollTo({
      left: slide?.offsetLeft ?? next * track.clientWidth,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
    setActiveIndex(next);
  };

  const syncActiveSlide = () => {
    window.cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActiveIndex(Math.min(Math.max(index, 0), media.length - 1));
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = safeIndex + 1;
    if (event.key === 'ArrowLeft') next = safeIndex - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = media.length - 1;
    if (next === null) return;
    event.preventDefault();
    goTo(next);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
    track.classList.add('tmm-media-gallery__track--dragging');
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;
    track.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove('tmm-media-gallery__track--dragging');
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    goTo(index);
  };

  return (
    <section
      className={`tmm-media-gallery ${className}`.trim()}
      data-testid={testId}
      role="region"
      aria-roledescription={t('galleryRoleDescription')}
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={trackRef}
        className="tmm-media-gallery__track"
        data-testid="gallery-track"
        onScroll={syncActiveSlide}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {media.map((item, index) => {
          const copy = fieldworkMediaText(item, locale);
          return (
            <figure
              className="tmm-media-gallery__slide"
              data-gallery-slide
              aria-label={fillTemplate(t('gallerySlideLabel'), {
                n: String(index + 1),
                total: String(media.length),
              })}
              key={item.provenance.driveFileId}
            >
              <img
                src={item.fallbackSrc}
                srcSet={fieldworkMediaSrcSet(item)}
                sizes="(max-width: 480px) 100vw, 640px"
                width={item.width}
                height={item.height}
                alt={copy.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
              />
              <figcaption>{copy.caption}</figcaption>
            </figure>
          );
        })}
      </div>

      <button
        type="button"
        className="tmm-media-gallery__control tmm-media-gallery__control--previous"
        onClick={() => goTo(safeIndex - 1)}
        disabled={safeIndex === 0}
        aria-label={t('galleryPrevious')}
      >
        ‹
      </button>
      <button
        type="button"
        className="tmm-media-gallery__control tmm-media-gallery__control--next"
        onClick={() => goTo(safeIndex + 1)}
        disabled={safeIndex === media.length - 1}
        aria-label={t('galleryNext')}
      >
        ›
      </button>

      <div
        className="tmm-media-gallery__pagination"
        role="group"
        aria-label={t('galleryPaginationLabel')}
      >
        {media.map((item, index) => {
          const copy = fieldworkMediaText(item, locale);
          return (
            <button
              type="button"
              className="tmm-media-gallery__pagination-button"
              data-gallery-pagination={index}
              aria-current={index === safeIndex ? 'true' : undefined}
              aria-label={copy.title}
              onClick={() => goTo(index)}
              key={item.provenance.driveFileId}
            >
              <img src={item.variants[0].src} alt="" loading="lazy" decoding="async" />
            </button>
          );
        })}
      </div>

      <span className="tmm-media-gallery__status" data-testid="gallery-status" aria-live="polite">
        {safeIndex + 1} / {media.length}
      </span>
    </section>
  );
}
