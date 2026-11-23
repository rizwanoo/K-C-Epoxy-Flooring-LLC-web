export function BrandMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="33" height="33" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 25L18 11L28 25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
      <path d="M12.5 25L18 17.5L23.5 25" stroke="#1D4ED8" strokeWidth="1.75" strokeLinecap="square" />
      <line x1="6" y1="28.5" x2="30" y2="28.5" stroke="#1D4ED8" strokeWidth="1.5" />
    </svg>
  );
}
