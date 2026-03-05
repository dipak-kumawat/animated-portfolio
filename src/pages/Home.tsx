import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImage from "../assets/hero-image.webp";

export default function HomePage() {
  const titleRef = useRef(null);

  useEffect(() => {
    const letters = titleRef.current.querySelectorAll(".wave-letter");

    gsap.fromTo(
      letters,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)", // bounce back effect
        stagger: 0.02, // wave effect
      },
    );
  }, []);
useEffect(() => {
  let lastSpawn = 0;

  const handleMouseMove = (e) => {
    const now = Date.now();

    if (now - lastSpawn < 300) return;
    if (Math.random() > 0.2) return;

    lastSpawn = now;

    const yes = document.createElement("span");
    yes.innerText = "yes!";

    const size = Math.random() * 120 + 60;
    const rotation = Math.random() * 40 - 20;
    const drift = Math.random() * 40 - 20;

    yes.style.position = "fixed";
    yes.style.left = `${e.clientX}px`;
    yes.style.top = `${e.clientY}px`;
    yes.style.fontSize = `${size}px`;
    yes.style.fontFamily = "'Caveat', cursive";
    yes.style.color = "#FF5A26";
    yes.style.fontWeight = "bold";
    yes.style.pointerEvents = "none";
    yes.style.zIndex = "999";
    yes.style.opacity = "0";
    yes.style.transform = `scale(0.5) rotate(${rotation}deg)`;

    document.body.appendChild(yes);

    const tl = gsap.timeline({
      onComplete: () => yes.remove(),
    });

    // smooth appear
    tl.to(yes, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "back.out(2)",
    })

      // little float
      .to(
        yes,
        {
          x: drift,
          duration: 0.8,
          ease: "sine.out",
        },
        "<",
      )

      // pause before fall
      .to(yes, {
        duration: 0.6,
      })

      // fall animation
      .to(yes, {
        y: 200 + Math.random() * 140,
        opacity: 0,
        duration: 1.2,
        ease: "power2.in",
      });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
  const text = "WEBSITES THAT MAKE CLIENTS ";

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Hero Image */}
      {/* Hero Image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <img
          src={heroImage}
          alt="Hero"
          className="w-[450px] sm:w-[420px] md:w-[450px] lg:w-[450px] object-contain"
        />
      </div>

      {/* Fog Effect */}
      <div
        className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #FF5A26 0%, rgba(255, 90, 38, 0.7) 40%, rgba(255, 90, 38, 0) 100%)",
        }}
      />

      <div className="relative z-0 w-full flex items-start pt-5 justify-center px-6">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-[11rem] font-anton uppercase tracking-[0.01em] leading-[1] text-slate-900"
          >
            {text.split("").map((letter, index) => (
              <span key={index} className="wave-letter inline-block">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}

            <span className="ml-32 inline-block">
              {`SAY`.split("").map((letter, index) => (
                <span key={index} className="wave-letter inline-block">
                  {letter}
                </span>
              ))}
            </span>

            <span
              style={{
                fontFamily: "'Caveat', cursive",
                transform: "rotate(-5deg)",
              }}
              className="text-[#FF5A26] inline-block tracking-normal text-7xl md:text-[8rem] lg:text-[12rem] lowercase font-bold ml-4"
            >
              {"yes!".split("").map((letter, index) => (
                <span key={index} className="wave-letter inline-block">
                  {letter}
                </span>
              ))}
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden">
        <div className="w-full h-28 md:h-32 flex items-center justify-between px-1 md:px-2 text-black font-light">
          <div className="max-w-md md:max-w-2xl">
            <p className="text-xl md:text-2xl lg:text-2xl leading-[1.1] tracking-tight">
              Your website sets your level before you speak. I <br />
              build the kind that puts you a step above.
            </p>
          </div>

          <div className="hidden sm:block">
            <span className="text-xs md:text-sm tracking-[0.3em] font-light uppercase">
              (SCROLL TO SEE HOW)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
