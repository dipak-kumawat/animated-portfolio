import { useEffect, useRef } from "react";
import PageTransition from "../components/PageTransition";
import { skills } from "../data/dummy";
import { Code, Layout, Server, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup timeline for orchestrated about page intro
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".about-header", { y: 30, opacity: 0, duration: 0.6 })
        .from(
          ".about-text",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.2",
        )
        .from(
          ".skill-category",
          { x: -20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        )
        .from(
          ".skill-item",
          { scale: 0.8, opacity: 0, duration: 0.3, stagger: 0.05 },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="py-12 max-w-4xl mx-auto min-h-[calc(100vh-180px)]"
      >
        <div className="about-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Behind the <span className="text-cyan-600">Code</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p className="about-text">
              Hello! I'm a passionate software engineer who loves turning
              complex problems into elegant, intuitive interfaces. My journey
              into web development started back in the early days of table-based
              layouts, and I've been obsessed with bringing pixels to life ever
              since.
            </p>
            <p className="about-text">
              Today, my focus is on building accessible, premium digital
              experiences. I believe that animation shouldn't just be
              decoration—it should guide the user, provide meaningful feedback,
              and create moments of delight.
            </p>
            <p className="about-text text-indigo-600 border-l-4 border-indigo-500 pl-4 py-1 italic">
              "Great design is about making things work seamlessly, not just
              making them look pretty."
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 about-text">
            {/* Placeholder Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 to-transparent mix-blend-overlay z-10" />
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
              alt="Developer working"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 about-text flex items-center">
            <Sparkles className="mr-3 text-cyan-600" /> Core Competencies
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((category, i) => (
              <div
                key={category.name}
                className="skill-category bg-white/60 p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center mb-4 text-indigo-600">
                  {i === 0 && <Layout className="mr-2" />}
                  {i === 1 && <Server className="mr-2" />}
                  {i === 2 && <Code className="mr-2" />}
                  <h4 className="text-lg font-semibold text-slate-900">
                    {category.name}
                  </h4>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li
                      key={skill}
                      className="skill-item text-sm px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200 hover:border-indigo-500/50 hover:text-indigo-600 transition-colors cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
