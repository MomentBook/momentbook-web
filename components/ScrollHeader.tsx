"use client";

import { useEffect, useRef, useState } from "react";

type ScrollHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollHeader({ children, className }: ScrollHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // At top of page
          if (currentScrollY < 10) {
            setIsAtTop(true);
            setIsVisible(true);
          } else {
            setIsAtTop(false);

            // Scrolling down - hide header
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
              setIsVisible(false);
            }
            // Scrolling up - show header
            else if (currentScrollY < lastScrollY.current) {
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${className || ""} ${!isVisible ? "header-hidden" : ""} ${isAtTop ? "header-at-top" : "header-scrolled"}`}
      style={{
        transition: "transform 0.3s ease-in-out",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      {children}
    </header>
  );
}
