export function YoutubeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function SpotifyIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15c3-1 6-1 9 1" />
      <path d="M7 12.5c4-1.5 7.5-1.5 11 1" />
      <path d="M6.5 10c4.5-2 9-2 13 1" />
    </svg>
  );
}

export function SoundCloudIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14.5A2.5 2.5 0 0 0 4.5 17h12a3.5 3.5 0 0 0 .682-6.932A5.002 5.002 0 0 0 7.528 7.66 4.5 4.5 0 0 0 2 11.5v3z" />
      <path d="M6 10v7" />
      <path d="M8 9v8" />
      <path d="M10 8v9" />
      <path d="M12 9v8" />
      <path d="M14 10v7" />
    </svg>
  );
}
