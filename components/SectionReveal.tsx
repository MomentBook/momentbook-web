"use client";

import {
  Children,
  cloneElement,
  isValidElement,
} from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { isLocalizedHomePath } from "@/lib/i18n/pathname";
import { Reveal } from "./Reveal";

type SectionRevealOwnProps<T extends ElementType> = {
  as?: T;
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
  staggerIndex?: number;
  variant?: "section" | "item";
};

type SectionRevealProps<T extends ElementType> =
  SectionRevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SectionRevealOwnProps<T>>;

const SECTION_DISTANCE = 18;
const ITEM_DISTANCE = 12;
const SECTION_DURATION = 760;
const ITEM_DURATION = 640;
const SECTION_THRESHOLD = 0.12;
const ITEM_THRESHOLD = 0.16;
const STAGGER_STEP_MS = 70;

export function SectionReveal<T extends ElementType = "div">({
  as,
  asChild = false,
  children,
  className,
  wrapperClassName,
  delay = 0,
  staggerIndex = 0,
  variant = "section",
  ...rest
}: SectionRevealProps<T>) {
  const pathname = usePathname();
  const shouldAnimate = isLocalizedHomePath(pathname);
  const isItem = variant === "item";
  const staggerDelay = Math.max(0, staggerIndex) * STAGGER_STEP_MS;
  const Component = (as ?? "div") as ElementType;
  const childProps = {
    className,
    ...rest,
  };

  if (asChild) {
    const childArray = Children.toArray(children);

    if (childArray.length !== 1 || !isValidElement(childArray[0])) {
      throw new Error("SectionReveal with asChild requires a single React element child.");
    }

    const child = childArray[0] as ReactElement<{ className?: string }>;
    const mergedClassName = [child.props.className, className]
      .filter(Boolean)
      .join(" ");

    const renderedChild = cloneElement(child, {
      ...rest,
      className: mergedClassName || undefined,
    });

    if (!shouldAnimate) {
      if (wrapperClassName) {
        return (
          <div className={wrapperClassName}>
            {renderedChild}
          </div>
        );
      }

      return renderedChild;
    }

    return (
      <Reveal
        className={wrapperClassName}
        delay={delay + staggerDelay}
        duration={isItem ? ITEM_DURATION : SECTION_DURATION}
        distance={isItem ? ITEM_DISTANCE : SECTION_DISTANCE}
        threshold={isItem ? ITEM_THRESHOLD : SECTION_THRESHOLD}
      >
        {renderedChild}
      </Reveal>
    );
  }

  if (!shouldAnimate) {
    return (
      <Component {...childProps}>
        {children}
      </Component>
    );
  }

  return (
    <Reveal
      className={wrapperClassName}
      delay={delay + staggerDelay}
      duration={isItem ? ITEM_DURATION : SECTION_DURATION}
      distance={isItem ? ITEM_DISTANCE : SECTION_DISTANCE}
      threshold={isItem ? ITEM_THRESHOLD : SECTION_THRESHOLD}
    >
      <Component {...childProps}>
        {children}
      </Component>
    </Reveal>
  );
}
