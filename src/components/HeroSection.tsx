import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from("[data-hero-line]", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from("[data-hero-sub]", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power4.out",
      });
      gsap.from("[data-hero-cta]", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        delay: 1.2,
        ease: "power4.out",
      });

      // Scroll parallax and fade
      gsap.to("[data-hero-content]", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-container flex min-h-screen flex-col justify-center relative overflow-hidden">
      <div data-hero-content>
        <div className="flex items-center gap-4 mb-8 font-mono text-sm" data-hero-line>
          <span className="text-primary">saran@fedora</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-accent">~</span>
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground">./execute_portfolio.sh<span className="animate-blink font-bold">_</span></span>
        </div>

        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-[6rem]" data-hero-line>
          <span className="block text-muted-foreground">Hi, I'm</span>
          <span className="block text-foreground">
            Saran Sri Datha
          </span>
          <span className="block text-gradient-primary glow-text">
            Madhipati.
          </span>
        </h1>

        <p className="mt-10 max-w-2xl text-lg text-secondary-foreground md:text-xl font-light leading-relaxed" data-hero-sub>
          Application Reliability Engineer Intern at <span className="text-foreground">2LYP Computations</span> and Cloud Computing Honors student at <span className="text-foreground">Chandigarh University</span>. I build resilient, multi-tiered infrastructure and intelligent aviation risk systems.
        </p>

        <div className="mt-14 flex items-center gap-6" data-hero-cta>
          <a
            href="#projects"
            data-magnetic
            className="relative overflow-hidden group rounded-full border border-border bg-muted/50 px-8 py-4 font-mono text-sm text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <span className="relative z-10 transition-colors duration-300">View Work</span>
          </a>
          <a
            href="#contact"
            data-magnetic
            className="group flex items-center gap-3 font-mono text-sm text-muted-foreground transition-all hover:text-foreground"
          >
            <span className="h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-8" />
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}
