import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TerminalPlayground from "./TerminalPlayground";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header and line
      gsap.from("[data-contact-header]", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 30, opacity: 0, duration: 1, ease: "power3.out"
      });
      gsap.from("[data-contact-line]", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        scaleX: 0, transformOrigin: "left center", duration: 1.5, ease: "power4.inOut"
      });

      // Links reveal
      gsap.from("[data-contact-link]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="section-container pb-40">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs text-muted-foreground/80" data-contact-header>05</span>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl" data-contact-header>
          Connect
        </h2>
        <span className="h-px flex-1 bg-border" data-contact-line />
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
        {/* Persistent Links */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-foreground">Immediate Reach</h3>
            <p className="text-secondary-foreground font-light leading-relaxed max-w-sm">
              Currently based in <span className="text-foreground">East Godavari</span>, open for architectural discussions and reliability engineering challenges.
            </p>
          </div>

          <div className="space-y-4">
            <a href="mailto:saransridatta.0@gmail.com" data-contact-link className="group flex items-center gap-6 p-6 glass-card rounded-2xl hover:border-primary/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <div className="text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">Email</div>
                <div className="text-sm font-mono text-foreground font-medium">saransridatta.0@gmail.com</div>
              </div>
            </a>

            <a href="https://github.com/saransridatha" target="_blank" rel="noopener noreferrer" data-contact-link className="group flex items-center gap-6 p-6 glass-card rounded-2xl hover:border-primary/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </div>
              <div>
                <div className="text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">GitHub</div>
                <div className="text-sm font-mono text-foreground font-medium">github.com/saransridatha</div>
              </div>
            </a>

            <a href="https://linkedin.com/in/saransridatha" target="_blank" rel="noopener noreferrer" data-contact-link className="group flex items-center gap-6 p-6 glass-card rounded-2xl hover:border-primary/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <div className="text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">LinkedIn</div>
                <div className="text-sm font-mono text-foreground font-medium">linkedin.com/in/saransridatha</div>
              </div>
            </a>
          </div>
        </div>

        {/* Terminal Playground */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-foreground">Debug Console</h3>
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-500/50" />
            </div>
          </div>
          <TerminalPlayground />
        </div>
      </div>
    </section>
  );
}
