import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../assets/hero-image.webp";
import { WaveTextAnim, SplitText } from "../components/WaveTextAnim";
export default function HomePage() {
  gsap.registerPlugin(ScrollTrigger);
  const titleRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: "center center",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        ".hand-drawn-arrow",
        {
          opacity: 0,
          duration: 0.1,
        },
        0,
      );

      tl.to(
        videoContainerRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "power2.inOut",
        },
        0,
      );
    });

    return () => ctx.revert();
  }, []);

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
      yes.style.zIndex = "10";
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

  // What I Do animation
  useEffect(() => {
    const fadeElements = gsap.utils.toArray(".what-do-fade");

    gsap.fromTo(
      fadeElements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".what-i-do-section",
          start: "top 75%",
        },
      },
    );
  }, []);

  const text = "WEBSITES THAT MAKE CLIENTS ";

  return (
    <div className="relative w-full bg-[#F1EFE7]">
      <div className="sticky top-20 w-full h-[calc(100vh-80px)] overflow-hidden">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none z-[20]">
            <img
              src={heroImage}
              alt="Hero"
              className="w-[450px] sm:w-[420px] md:w-[450px] lg:w-[450px] object-contain "
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
      </div>

      {/* Scroll Reveal Panel */}
      <div className="relative z-[60] bg-white text-slate-900 w-full rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] min-h-screen p-8 md:p-16 flex flex-col items-center pt-24">
        <div className="  w-full">
          {/* WHAT I DO Section */}
          <div className="what-i-do-section w-full py-16 md:py-28 px-6 md:px-12 flex flex-col items-center text-center bg">
            <span className="what-do-fade text-sm tracking-[0.2em] text-slate-800 uppercase mb-8 font-light inline-block">
              What I Do
            </span>
            <WaveTextAnim 
              as="h2"
              triggerOnScroll={true}
              scrollStart="top 75%"
              className="text-4xl md:text-6xl lg:text-[5.5rem] font-anton uppercase leading-[1.05] text-black inline-block"
            >
              <SplitText text="I build websites for expertise-led companies that make their value undeniable and" />
              <span
                className="text-[#FF5A26] inline-block tracking-normal mx-1"
                style={{
                  fontFamily: "'Caveat', cursive",
                  transform: "rotate(-5deg) translateY(-5px)",
                  fontSize: "1.25em",
                }}
              >
                <SplitText text={'"YES"'} />
              </span>{" "}
              <SplitText text="inevitable." />
            </WaveTextAnim>
          </div>
          {/* Video / Coming Soon Section */}
          <div
            ref={videoWrapperRef}
            className="w-full h-screen flex justify-center items-center mb-20 relative"
          >
            <div className="relative flex justify-center items-center w-full max-w-[100vw]">
              {/* Hand-drawn text and arrow */}
              <div className="hand-drawn-arrow absolute -top-32 right-1/2 md:right-[calc(50%+18rem)] md:-top-16 flex flex-col items-center md:items-end w-[260px] z-20 pointer-events-none">
                <span
                  className="text-3xl md:text-3xl text-slate-800 tracking-wider text-center md:text-right leading-relaxed"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    transform: "rotate(-6deg)",
                  }}
                >
                  Watch this to see
                  <br />
                  how I can help
                </span>

                {/* Arrow (Desktop) - Curved downwards from left to right */}
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden md:block self-end mt-2 mr-[-60px]"
                  style={{ transform: "rotate(270deg) scaleX(-1)" }}
                >
                  <path
                    d="M10 20 C 50 10, 90 20, 110 90"
                    stroke="#1e293b"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M90 75 L 110 90 L 115 65"
                    stroke="#1e293b"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Arrow (Mobile) - Pointing down-right */}
                <svg
                  width="60"
                  height="80"
                  viewBox="0 0 60 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:hidden mt-2 ml-16"
                >
                  <path
                    d="M10 0 Q 50 30 45 75"
                    stroke="#1e293b"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30 60 L 45 75 L 55 60"
                    stroke="#1e293b"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Video Thumbnail */}
              <div
                ref={videoContainerRef}
                className="w-[320px] h-[200px] md:w-[480px] md:h-[280px] shrink-0 bg-[#111] rounded-[24px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] mx-auto z-10 border border-white/10"
              >
                {/* Simulated Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
                  }}
                ></div>

                {/* Coming Soon Pill */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)] border border-white/10 text-white/90 text-xs md:text-sm tracking-[0.2em] font-medium px-6 py-3 rounded-full flex items-center gap-3 relative overflow-hidden transition-transform duration-500 hover:scale-105">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#FF5A26]"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    COMING SOON
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] animate-[shimmer_2.5s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extra height for scrolling */}
        <div className="h-[20vh] w-full"></div>
      </div>

      {/* New Section Placeholder */}
      <div className="relative z-60 bg-[#111] text-white w-full min-h-screen p-8 md:p-16 flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-7xl font-anton uppercase mb-6 text-center">
          The Next Chapter
        </h2>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl text-center font-light">
          This is where the new section begins after the video animation
          completes.
        </p>
      </div>
    </div>
  );
}
