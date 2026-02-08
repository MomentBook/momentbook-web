type MomentBookLogoProps = {
  className?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
};

export function MomentBookLogo({
  className,
  iconClassName,
  wordmarkClassName,
}: MomentBookLogoProps) {
  return (
    <span className={className}>
      <img
        className={iconClassName}
        src="/logo.svg"
        alt=""
        aria-hidden="true"
      />
      <img
        className={wordmarkClassName}
        src="/wordmark.svg"
        alt="MomentBook"
      />
    </span>
  );
}
