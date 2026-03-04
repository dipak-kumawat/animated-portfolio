import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface TextWaveHoverProps {
  /** The text to display and animate */
  text: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Duration of the animation per letter (default: 0.45s) */
  duration?: number;
  /** Stagger delay between each letter (default: 0.04s) */
  stagger?: number;
}

export const TextWaveHover: React.FC<TextWaveHoverProps> = ({
  text,
  className = "",
  duration = 0.45,
  stagger = 0.04,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Select all letter spans for both layers
    const primaryLetters =
      containerRef.current.querySelectorAll(".primary-letter");
    const secondaryLetters =
      containerRef.current.querySelectorAll(".secondary-letter");

    // Create a GSAP Timeline paused initially
    tl.current = gsap.timeline({ paused: true });

    // Animate primary letters up and out of view
    // Animate secondary letters up into view
    // Using yPercent: -100 moves the element up by exactly 100% of its own height.
    tl.current
      .to(
        primaryLetters,
        {
          yPercent: -100,
          duration: duration,
          ease: "expo.out",
          stagger: stagger,
        },
        0,
      )
      .to(
        secondaryLetters,
        {
          yPercent: -100,
          duration: duration,
          ease: "expo.out",
          stagger: stagger,
        },
        0, // Start exactly at the same time as primary letters
      );

    // Cleanup timeline on unmount
    return () => {
      tl.current?.kill();
    };
  }, [duration, stagger]);

  const handleMouseEnter = () => {
    tl.current?.play();
  };

  const handleMouseLeave = () => {
    tl.current?.reverse();
  };

  // Helper to render string into individual spans for letter-by-letter animation
  const renderLetters = (textStr: string, layerClass: string) => {
    return textStr.split("").map((char, index) => (
      <span
        key={index}
        className={`${layerClass} inline-block`}
        style={{
          whiteSpace: char === " " ? "pre" : "normal",
          // Performance optimization: Hardware accelerate transforms
          willChange: "transform",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // overflow-hidden ensures text outside the container bounds is hidden
      className={`relative overflow-hidden inline-flex flex-col items-center justify-center cursor-pointer ${className}`}
      style={{ lineHeight: 1 }}
    >
      {/* Primary visible text */}
      <div className="flex relative">
        {renderLetters(text, "primary-letter")}
      </div>

      {/* Secondary hidden text initially placed just below the container (-bottom is effectively top: 100%) */}
      <div className="flex absolute top-[100%] left-0">
        {renderLetters(text, "secondary-letter")}
      </div>
    </div>
  );
};
