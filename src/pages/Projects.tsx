import { useEffect, useRef } from "react";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/dummy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple header animation on entry
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  return (
    <PageTransition>
      <div className="py-10 min-h-screen">
        <div ref={headerRef} className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Selected <span className="text-indigo-600">Works</span>
          </h2>
          <p className="text-slate-600 text-lg">
            A showcase of my recent projects, demonstrating my expertise in
            frontend development, UI/UX design, and creating responsive web
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
