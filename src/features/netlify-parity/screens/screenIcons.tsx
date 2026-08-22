interface IconProps {
  className?: string;
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 5 8 12 15 19" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 15V4M8 7l4-4 4 4M5 11v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function PinIcon({ className = 'ic' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" style={{ color: '#F05B5B' }} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  );
}

export function TrainIcon({ className = 'ic' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" style={{ color: '#5E7239' }} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2c-4 0-7 .5-7 4v9a3 3 0 0 0 3 3l-1.5 1.5v.5h2L10 18h4l1.5 2h2v-.5L16 18a3 3 0 0 0 3-3V6c0-3.5-3-4-7-4Zm-4.5 12A1.5 1.5 0 1 1 9 12.5 1.5 1.5 0 0 1 7.5 14Zm9 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5ZM17 9H7V6h10Z"
      />
    </svg>
  );
}

export function WalkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 5.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2ZM9.8 8.9 7 22h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.3 7.3 0 0 0 19 12v-2a5.2 5.2 0 0 1-4.5-2.5l-1-1.6a2 2 0 0 0-1.7-.9 2 2 0 0 0-.75.15L6 7.3V12h2V8.65Z"
      />
    </svg>
  );
}

export function ClockIcon({ className = 'ic' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.2 14.2L11 13.3V7h1.8v5.4l4.4 2.6Z" />
    </svg>
  );
}

export function GearIcon({ className = 'ic' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm8.9 4a6.9 6.9 0 0 0-.1-1.1l2-1.5-2-3.4-2.3 1a7.6 7.6 0 0 0-1.9-1.1L16.2 3H7.8l-.4 2.9a7.6 7.6 0 0 0-1.9 1.1l-2.3-1-2 3.4 2 1.5a6.9 6.9 0 0 0 0 2.2l-2 1.5 2 3.4 2.3-1a7.6 7.6 0 0 0 1.9 1.1l.4 2.9h8.4l.4-2.9a7.6 7.6 0 0 0 1.9-1.1l2.3 1 2-3.4-2-1.5a6.9 6.9 0 0 0 .1-1.1Z"
      />
    </svg>
  );
}

export function BookmarkIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 4h10v16l-5-3.5L7 20Z" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm-8-9.2h2.6l1.5-2h7.8l1.5 2H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm8 12.2a5.2 5.2 0 1 1 0-10.4 5.2 5.2 0 0 1 0 10.4Z" />
    </svg>
  );
}

export function InformationIcon({ className = 'ic' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 10.5v6M12 7.4v.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
