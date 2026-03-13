import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SkySafe",
    desc: "Aviation Risk Intelligence Platform utilizing Gemini 2.0 Flash to synthesize disparate data vectors into real-time safety insights with Leaflet/Three.js mapping.",
    tags: ["Next.js", "Gemini 2.0", "Leaflet", "Three.js"],
    link: "https://skysafe.srebuilds.tech",
    github: "https://github.com/saransridatha/SkySafe",
  },
  {
    title: "Scholr 1.0",
    desc: "Led infrastructure deployment for a multi-school ERP platform under 2LYP Computations. Managed VPS environments with Podman containers and automated CI/CD workflows via Jenkins.",
    tags: ["Podman", "Jenkins", "Infrastructure"],
    link: "#",
  },
  {
    title: "FluxControl",
    desc: "Built a cloud-native serverless API rate limiter on AWS using Lambda, API Gateway, and DynamoDB atomic counters with a Proof-of-Work shield mode.",
    tags: ["AWS Lambda", "DynamoDB", "Serverless"],
    link: "https://github.com/saransridatha/fluxcontrol",
  },
  {
    title: "Basecamp",
    desc: "A Himalayan-themed terminal dashboard (TUI) for Linux. Integrates real-time system vitals, AI-powered 'Radio' via Gemini, and interactive DevOps study tracks.",
    tags: ["Python", "TUI", "Gemini AI", "Linux"],
    link: "https://github.com/saransridatha/basecamp",
  },
  {
    title: "InfraPulse",
    desc: "A Go-based lightweight daemon for continuous server health monitoring with automated SMTP alerting for critical system events.",
    tags: ["Go", "Monitoring", "Automation"],
    link: "https://github.com/saransridatha/InfraPulse",
  },
  {
    title: "httpTest",
    desc: "CLI-based benchmarking tool for simulating distributed web traffic and performing deep API endpoint analysis.",
    tags: ["Go", "CLI", "Performance"],
    link: "https://github.com/saransridatha/httpTest",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={cardRef}
      data-proj-card
      className="group glass-card rounded-2xl p-8 md:p-10 transition-all duration-700 hover:bg-primary/5 hover:border-primary/20"
      style={{ transform, transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start mb-12">
        <div className="font-mono text-5xl font-light text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
          0{index + 1}
        </div>
        <div className="flex gap-4">
          {/* GitHub Icon for either explicit github field or github link */}
          {(('github' in project && project.github) || (project.link.includes('github.com'))) && (
            <a 
              href={(('github' in project && project.github) ? project.github : project.link) as string} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="opacity-50 hover:opacity-100 transition-opacity" 
              title="View Source"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
          
          {/* Arrow Icon only for non-github live links (like SkySafe) */}
          {project.link !== "#" && !project.link.includes('github.com') && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" title="View Live Site">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-2xl font-medium text-foreground mb-4 tracking-tight">
        <ScrambleText text={project.title} />
      </h3>
      <p className="text-secondary-foreground mb-8 leading-relaxed font-light min-h-[80px]">{project.desc}</p>
      
      <div className="flex flex-wrap gap-3">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs border border-border rounded-full px-4 py-1.5 text-muted-foreground group-hover:border-primary/50 text-primary transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grow line animation
      gsap.from("[data-proj-line]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power4.inOut",
      });

      // Staggered header reveal
      gsap.from("[data-proj-header]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Alternating slide-in for cards
      gsap.utils.toArray<HTMLElement>("[data-proj-card]").forEach((card, i) => {
        const isEven = i % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          x: isEven ? -60 : 60,
          opacity: 0,
          rotationY: isEven ? 10 : -10,
          duration: 1.2,
          ease: "power4.out",
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="projects" className="section-container">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs text-muted-foreground/80" data-proj-header>03</span>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl" data-proj-header>
          Selected Work
        </h2>
        <span className="h-px flex-1 bg-border" data-proj-line />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-16">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
