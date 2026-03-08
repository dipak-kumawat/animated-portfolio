import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextWaveHover } from "../components/TextWaveHover";

export default function Layout() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple fade-in animation for the layout on mount
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, []);
 
  return (
    <div className="min-h-screen bg-[#F1EFE7] text-slate-900 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Navigation Bar */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#F1EFE7]"
      >
        <div className="w-full px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-4xl font-anton tracking-tighter text-black hover:opacity-80 transition-opacity"
            style={{
              letterSpacing: "-0.05em",
            }}
          >
            DK
          </Link>

          {/* Centered Links */}
          <ul className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-row space-x-1 sm:space-x-8">
            <li key="Portfolio">
              <Link
                to="/projects"
                className={`relative flex items-center px-2 py-2 text-[18px] tracking-widest font-medium transition-colors hover:text-black uppercase
                  ${location.pathname === "/projects" ? "text-black" : "text-black/70"}
                `}
              >
                <TextWaveHover text="PORTFOLIO" />
                {location.pathname === "/projects" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />
                )}
              </Link>
            </li>
            <li key="My Process">
              <Link
                to="/about"
                className={`relative flex items-center px-2 py-2 text-[18px] tracking-widest font-medium transition-colors hover:text-black uppercase
                  ${location.pathname === "/about" ? "text-black" : "text-black/70"}
                `}
              >
                <TextWaveHover text="MY PROCESS" />
                {location.pathname === "/about" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />
                )}
              </Link>
            </li>
            <li key="About">
              <Link
                to="/contact"
                className={`relative flex items-center px-2 py-2 text-[18px] tracking-widest font-medium transition-colors hover:text-black uppercase
                  ${location.pathname === "/contact" ? "text-black" : "text-black/70"}
                `}
              >
                <TextWaveHover text="ABOUT" />
                {location.pathname === "/contact" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />
                )}
              </Link>
            </li>
          </ul>

          {/* Let's Talk Button */}
          <Link
            to="/contact"
            className="flex items-center bg-[#1A1A1A] text-white hover:bg-black transition-colors rounded-[4px] overflow-hidden p-2"
          >
            <div className="h-full">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                alt="Avatar"
                className="w-10 h-10 object-cover grayscale"
              />
            </div>
            <span className="px-4 text-[13px] font-medium tracking-wider">
              LET'S TALK
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-slate-50/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} Modern Portfolio. Crafted with React,
            Tailwind & GSAP.
          </p>
        </div>
      </footer>
    </div>
  );
}
