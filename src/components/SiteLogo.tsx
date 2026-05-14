type SiteLogoProps = {
  className?: string;
};

/**
 * Brand mark from `public/logo.svg` (rounded square + FF monogram).
 * Pair with visible brand name; keep `alt` empty so the name is the single accessible label.
 */
export default function SiteLogo({className = 'h-9 w-9 shrink-0 sm:h-10 sm:w-10'}: SiteLogoProps) {
  return (
    <img
      src="/logo.svg"
      alt=""
      width={40}
      height={40}
      decoding="async"
      className={`rounded-[10px] object-cover ${className}`}
    />
  );
}
