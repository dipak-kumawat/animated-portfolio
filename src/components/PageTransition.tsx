import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    const el = containerRef.current;
    if (el) {
      // Very elegant GSAP entrance animation on route change
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    }
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 py-12">
      {children}
    </div>
  );
}
