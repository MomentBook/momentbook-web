import Image from "next/image";

const DEFAULT_ICON_SIZE = 40;
const DEFAULT_WORDMARK_WIDTH = 180;
const DEFAULT_WORDMARK_HEIGHT = 44;

type MomentBookLogoProps = {
  className?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
  iconOnly?: boolean;
  hideIcon?: boolean;
  iconSize?: number;
  wordmarkWidth?: number;
  wordmarkHeight?: number;
};

function px(value: number) {
  return `${value}px`;
}

export function MomentBookLogo({
  className,
  iconClassName,
  wordmarkClassName,
  iconOnly = false,
  hideIcon = false,
  iconSize,
  wordmarkWidth,
  wordmarkHeight,
}: MomentBookLogoProps) {
  const iconDimension = iconSize ?? DEFAULT_ICON_SIZE;
  const wordmarkDimensionWidth = wordmarkWidth ?? DEFAULT_WORDMARK_WIDTH;
  const wordmarkDimensionHeight = wordmarkHeight ?? DEFAULT_WORDMARK_HEIGHT;
  const shouldShowIcon = iconOnly ? true : !hideIcon;
  const shouldShowWordmark = !iconOnly;

  return (
    <span className={className}>
      {shouldShowIcon && (
        <Image
          className={iconClassName}
          src="/images/logos/momentbook-logo-only-transparent.png"
          alt=""
          aria-hidden="true"
          width={iconDimension}
          height={iconDimension}
          sizes={px(iconDimension)}
        />
      )}
      {shouldShowWordmark && (
        <Image
          className={wordmarkClassName}
          src="/wordmark.svg"
          alt="MomentBook"
          width={wordmarkDimensionWidth}
          height={wordmarkDimensionHeight}
          sizes={px(wordmarkDimensionWidth)}
        />
      )}
    </span>
  );
}
