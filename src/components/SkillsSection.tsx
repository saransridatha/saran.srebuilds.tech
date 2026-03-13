import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfrastructureMap from "./InfrastructureMap";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Compute & Core",
    skills: ["Go", "Python", "Bash", "C/C++", "Linux (Fedora/Debian)", "Systemd"]
  },
  {
    category: "Orchestration & Cloud",
    skills: ["AWS", "GCP", "Docker", "Podman", "Kubernetes"]
  },
  {
    category: "Automation & CI/CD",
    skills: ["Jenkins", "GitHub Actions", "Git", "n8n", "Shell Scripting"]
  },
  {
    category: "Data & Reliability",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Prometheus", "Grafana"]
  }
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skill-group]", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const marqueeSkills = skillGroups.flatMap(g => g.skills);
  const doubled = [...marqueeSkills, ...marqueeSkills];

  return (
    <section ref={ref} id="skills" className="section-container relative">
      <div className="mb-16 flex items-center gap-4" data-skill-group>
        <span className="font-mono text-xs text-muted-foreground/80">04</span>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
          Core Arsenal
        </h2>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="mb-16 space-y-6" data-skill-group>
        <p className="max-w-2xl text-lg text-secondary-foreground font-light leading-relaxed">
          My technical stack isn't just a list of tools; it's a connected topology designed for high availability and low-latency orchestration.
        </p>
        <InfrastructureMap />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            data-skill-group
            className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <h3 className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-6 border-b border-primary/10 pb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-muted/30 rounded-md text-xs text-secondary-foreground font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-muted/10 border-y border-border/50 py-8 mt-12 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((s, i) => (
            <span key={i} className="mx-8 font-mono text-xl font-bold text-muted-foreground/20 uppercase tracking-widest">
              {s} <span className="mx-8 text-primary/20">//</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
