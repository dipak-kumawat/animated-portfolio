import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface WaveTextAnimProps {
  children: React.ReactNode;
  className?: string;
  triggerOnScroll?: boolean;
  scrollStart?: string;
  stagger?: number;
  as?: React.ElementType;
}

export const WaveTextAnim: React.FC<WaveTextAnimProps> = ({
  children,
  className = "",
  triggerOnScroll = false,
  scrollStart = "top 75%",
  stagger = 0.02,
  as: Component = "span",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const letters = containerRef.current.querySelectorAll(".wave-letter");
    if (letters.length === 0) return;

    const animationProps: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: stagger,
    };

    if (triggerOnScroll) {
      animationProps.scrollTrigger = {
        trigger: containerRef.current,
        start: scrollStart,
      };
    }

    gsap.fromTo(letters, { y: 120, opacity: 0 }, animationProps);
  }, [triggerOnScroll, scrollStart, stagger]);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
};

export interface SplitTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  wordClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  letterClassName = "wave-letter inline-block",
  wordClassName = "inline-block",
}) => {
  return (
    <span className={className}>
      {text.split(" ").map((word, wordIndex, array) => (
        <React.Fragment key={wordIndex}>
          <span className={wordClassName}>
            {word.split("").map((letter, letterIndex) => (
              <span key={letterIndex} className={letterClassName}>
                {letter}
              </span>
            ))}
          </span>
          {wordIndex < array.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
};
