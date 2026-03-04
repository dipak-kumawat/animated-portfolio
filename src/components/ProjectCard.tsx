import { useRef, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import Button from "./Button";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reveal animation
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: index * 0.15, // Stagger based on index
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100px", // Trigger slightly before element comes into view
        },
      },
    );
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      className="group flex flex-col md:flex-row bg-white/80 border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
        <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors z-10" />
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-600 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-indigo-600 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex space-x-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Github className="w-4 h-4 mr-2" /> Code
          </Button>
          <a href={project.link} className="flex-1">
            <Button size="sm" fullWidth>
              <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
