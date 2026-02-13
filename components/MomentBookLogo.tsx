import Image from "next/image";

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
      <Image
        className={iconClassName}
        src="/images/logos/momentbook-logo-only-transparent.png"
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        sizes="40px"
      />
      <Image
        className={wordmarkClassName}
        src="/wordmark.svg"
        alt="MomentBook"
        width={180}
        height={44}
        sizes="180px"
      />
    </span>
  );
}
