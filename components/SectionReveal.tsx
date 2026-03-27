"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionRevealOwnProps<T extends ElementType> = {
  as?: T;
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
  children,
  className,
  wrapperClassName,
  delay = 0,
  staggerIndex = 0,
  variant = "section",
  ...rest
}: SectionRevealProps<T>) {
  const isItem = variant === "item";
  const staggerDelay = Math.max(0, staggerIndex) * STAGGER_STEP_MS;
  const Component = (as ?? "div") as ElementType;

  return (
    <Reveal
      className={wrapperClassName}
      delay={delay + staggerDelay}
      duration={isItem ? ITEM_DURATION : SECTION_DURATION}
      distance={isItem ? ITEM_DISTANCE : SECTION_DISTANCE}
      threshold={isItem ? ITEM_THRESHOLD : SECTION_THRESHOLD}
    >
      <Component className={className} {...rest}>
        {children}
      </Component>
    </Reveal>
  );
}
