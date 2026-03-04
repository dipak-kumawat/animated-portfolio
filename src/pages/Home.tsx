import heroImage from "../assets/hero-image.webp";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <img
          src={heroImage}
          alt="Hero"
          className="w-[270px] md:w-[370px] lg:w-[470px] object-contain"
        />
      </div>
      {/* Fog Effect Overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #FF5A26 0%, rgba(255, 90, 38, 0.7) 40%, rgba(255, 90, 38, 0) 100%)",
        }}
      />

      <div className="relative z-0 w-full flex items-start pt-5 justify-center px-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-[11rem] font-anton uppercase tracking-[0.01em] leading-[1] text-slate-900">
            WEBSITES THAT MAKE CLIENTS <span className="ml-32">SAY</span>
            <span className="inline-block relative">
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  transform: "rotate(-5deg)",
                }}
                className="text-[#FF5A26]  inline-block tracking-normal text-7xl md:text-[8rem] lg:text-[12rem] lowercase font-bold"
              >
                "yes!"
              </span>
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
