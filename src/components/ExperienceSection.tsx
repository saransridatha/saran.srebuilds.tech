import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Application Reliability Engineer Intern",
    company: "2LYP Computations",
    date: "Jan 2025 - Present",
    type: "Part-time (Hybrid)",
    items: [
      "Manage Linux-based VPS infrastructure and cloud resources across AWS for production systems.",
      "Design and maintain automated CI/CD pipelines using Jenkins for high-frequency deployments.",
      "Containerize complex applications using Docker and Podman to ensure environment parity.",
      "Implement robust monitoring and observability workflows with Prometheus and Grafana.",
      "Orchestrate backup mechanisms and reliability strategies to maintain 24/7 uptime.",
      "Collaborate with development teams to bridge the gap between production code and stable infrastructure.",
    ],
    tech: ["AWS", "Jenkins", "Docker", "Podman", "Prometheus", "Grafana"]
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header and line
      gsap.from("[data-exp-header]", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 30, opacity: 0, duration: 1, ease: "power3.out"
      });
      gsap.from("[data-exp-line]", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        scaleX: 0, transformOrigin: "left center", duration: 1.5, ease: "power4.inOut"
      });

      // Staggered item reveal
      gsap.from("[data-exp-item]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="section-container">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs text-muted-foreground/80" data-exp-header>02</span>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl" data-exp-header>
          Tenure
        </h2>
        <span className="h-px flex-1 bg-border" data-exp-line />
      </div>

      <div className="mt-16">
        {experiences.map((exp, i) => (
          <div key={i} className="relative pl-8 md:pl-12" data-exp-item>
            {/* Minimal Timeline Line */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent" />
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--glow-primary)]" />

            <div className="group glass-card-hover rounded-2xl p-8 md:p-10 mb-8 border border-border/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-medium text-foreground tracking-tight">{exp.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-secondary-foreground">{exp.company}</span>
                    <span className="h-1 w-1 rounded-full bg-primary/50" />
                    <span className="text-muted-foreground/80 text-sm">{exp.date}</span>
                  </div>
                </div>
                <span className="font-mono text-xs rounded-full border border-border bg-muted/50 px-4 py-1.5 text-secondary-foreground w-fit">
                  {exp.type}
                </span>
              </div>

              <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                <ul className="space-y-4">
                  {exp.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-4 text-secondary-foreground font-light leading-relaxed">
                      <span className="mt-2.5 h-px w-3 bg-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-4">
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Stack Orbit</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-primary/5 border border-primary/20 rounded-md text-[10px] font-mono text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
