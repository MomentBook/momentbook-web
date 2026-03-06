type HomeSectionScrollBehavior = "auto" | "smooth";

type ScrollHomeSectionOptions = {
  behavior?: HomeSectionScrollBehavior;
};

function resolveScrollBehavior(
  requestedBehavior: HomeSectionScrollBehavior,
): HomeSectionScrollBehavior {
  if (
    requestedBehavior === "smooth"
    && typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "auto";
  }

  return requestedBehavior;
}

export function getCenteredHomeSectionScrollTop(target: HTMLElement) {
  if (typeof window === "undefined") {
    return 0;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const rect = target.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const centeredTop = absoluteTop + (rect.height / 2) - (viewportHeight / 2);
  const maxScrollTop = Math.max(
    document.documentElement.scrollHeight - viewportHeight,
    0,
  );

  return Math.min(Math.max(centeredTop, 0), maxScrollTop);
}

export function scrollHomeSectionIntoView(
  target: HTMLElement,
  options: ScrollHomeSectionOptions = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.scrollTo({
    top: getCenteredHomeSectionScrollTop(target),
    behavior: resolveScrollBehavior(options.behavior ?? "smooth"),
  });

  window.requestAnimationFrame(() => {
    target.focus({ preventScroll: true });
  });
}
