import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from("[data-about-reveal]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Section line growth
      gsap.from("[data-about-line]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power4.inOut",
      });

      // Subtle parallax for foundations card
      gsap.to("[data-foundations-card]", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -30,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="section-container relative">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs text-muted-foreground/80" data-about-reveal>01</span>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl" data-about-reveal>
          Chronicles
        </h2>
        <span className="h-px flex-1 bg-border" data-about-line />
      </div>

      <div className="grid gap-16 md:grid-cols-[2fr_1fr] lg:grid-cols-[2.5fr_1fr] items-start">
        <div className="space-y-12">
          <div className="space-y-4" data-about-reveal>
            <h3 className="text-xl font-mono text-primary flex items-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              The Mission
            </h3>
            <p className="text-lg leading-relaxed text-secondary-foreground font-light">
              Based in <span className="text-foreground">East Godavari, Andhra Pradesh</span>, I am a Cloud Computing specialist currently navigating my 6th semester at <span className="text-foreground">Chandigarh University</span>. My journey is defined by a relentless pursuit of system reliability and architectural elegance.
            </p>
          </div>

          <div className="space-y-4" data-about-reveal>
            <h3 className="text-xl font-mono text-primary flex items-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              Professional Tenure
            </h3>
            <p className="text-lg leading-relaxed text-secondary-foreground font-light">
              As an <span className="text-foreground font-normal">Application Reliability Engineer at 2LYP Computations</span>, I orchestrate production-grade Linux environments. My daily operations involve hardening cloud infrastructure across AWS, automating complex CI/CD lifecycles with Jenkins, and containerizing distributed systems with Podman.
            </p>
          </div>

          <div className="space-y-4" data-about-reveal>
            <h3 className="text-xl font-mono text-primary flex items-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              The Build-First Philosophy
            </h3>
            <p className="text-lg leading-relaxed text-secondary-foreground font-light">
              I believe in engineering tools that I would actually use. This led to the creation of <em>"SkySafe"</em>, an aviation risk intelligence platform, and <em>"Basecamp"</em>, a Himalayan-themed terminal environment. Whether I'm configuring strict firewall policies or trekking through high-altitude peaks, my focus remains on resilience, navigation, and low-level performance.
            </p>
          </div>

          <div className="pt-8 border-t border-border/50" data-about-reveal>
            <div className="font-mono text-xs text-muted-foreground mb-6 tracking-widest uppercase">Interests & Expeditions</div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-secondary-foreground font-mono">
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Systems Engineering</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Aviation & Locomotives</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Trekking & Travelling</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Geopolitics</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Automotive Tech</span>
            </div>
          </div>
        </div>

        <div className="space-y-8 md:-mt-10">
          <div className="glass-card bg-black/40 backdrop-blur-xl rounded-2xl p-8" data-foundations-card>
            <div className="font-mono text-xs text-muted-foreground mb-6 tracking-widest uppercase">Foundations</div>
            <div className="space-y-6">
              <div className="relative pl-4 border-l border-primary/30">
                <div className="text-foreground font-medium text-sm">B.E. Computer Science</div>
                <div className="text-xs text-muted-foreground mt-1">Chandigarh University (2027)</div>
                <div className="text-[10px] text-primary mt-1 font-mono">CGPA: 7.27</div>
              </div>
              <div className="relative pl-4 border-l border-primary/20">
                <div className="text-foreground/80 font-medium text-sm">Higher Secondary</div>
                <div className="text-xs text-muted-foreground mt-1">Resonance Jr. College (2023)</div>
              </div>
              <div className="relative pl-4 border-l border-primary/10">
                <div className="text-foreground/60 font-medium text-sm">Secondary Education</div>
                <div className="text-xs text-muted-foreground mt-1">Dr. KKR Gowtham (2021)</div>
                <div className="text-[10px] text-primary/60 mt-1 font-mono">99.83%</div>
              </div>
            </div>
          </div>

          <div className="glass-card bg-black/40 backdrop-blur-xl rounded-2xl p-8">
            <div className="font-mono text-xs text-muted-foreground mb-6 tracking-widest uppercase">Certifications</div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--glow-primary)]" />
                <div>
                  <div className="text-foreground font-medium text-xs">AWS Solutions Architect</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Associate (CLF-C02)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60" />
                <div>
                  <div className="text-foreground font-medium text-xs">Azure AI Fundamentals</div>
                  <div className="text-[10px] text-muted-foreground mt-1">AI-900 (2025)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/30" />
                <div>
                  <div className="text-foreground font-medium text-xs">OCI Generative AI</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Professional (2024)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card bg-black/40 backdrop-blur-xl rounded-xl overflow-hidden border border-border shadow-2xl">
            <div className="bg-black/60 px-4 py-3 border-b border-border/50 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-4 font-mono text-xs text-muted-foreground/80 select-none">Daily Driver</span>
            </div>
            
            <div className="p-6 md:p-8 font-mono text-[10px] sm:text-xs leading-relaxed text-secondary-foreground bg-black/40 overflow-x-auto">
              <div>
                <span className="text-primary">saran@fedora</span><span className="text-muted-foreground">:</span><span className="text-accent">~</span><span className="text-muted-foreground">$</span> <span className="text-foreground">neofetch</span>
              </div>
              <div className="mt-6 flex flex-col xl:flex-row gap-6 items-start">
                {/* ASCII Art */}
                <pre className="font-mono leading-[1.15] hidden sm:block font-bold">
<span className="text-primary">{`          .',;::::;,'.
      .';cccccccccccc;,.
   .;cccccccccccccccccccc;.
 .:cccccccccccccccccccccccc:.
.;ccccccccccccc;.`}</span><span className="text-white">{`:dddl:`}</span><span className="text-primary">{`.;ccccccc;.
.:ccccccccccccc;`}</span><span className="text-white">{`OWMKOOXMWd`}</span><span className="text-primary">{`;ccccccc:.
.:ccccccccccccc;`}</span><span className="text-white">{`KMMc;cc;xMMc`}</span><span className="text-primary">{`;ccccccc:.
,cccccccccccccc;`}</span><span className="text-white">{`MMM.;cc;;WW:`}</span><span className="text-primary">{`;ccccccc,
:cccccccccccccc;`}</span><span className="text-white">{`MMM.;cccccccccccc`}</span><span className="text-primary">{`ccc:
:ccccccc;`}</span><span className="text-white">{`oxOOOo;MMM000k.`}</span><span className="text-primary">{`;ccccccccccc:
cccccc;`}</span><span className="text-white">{`0MMKxdd:;MMMkddc.`}</span><span className="text-primary">{`;ccccccccccc;
ccccc;`}</span><span className="text-white">{`XMO';cccc;MMM.`}</span><span className="text-primary">{`;ccccccccccccccc'
ccccc;`}</span><span className="text-white">{`MMo;ccccc;MMW.`}</span><span className="text-primary">{`;CCCCCCCCCCCCCC;
ccccc;`}</span><span className="text-white">{`0MNc.ccc.xMMd;`}</span><span className="text-primary">{`cccccccccccccc;
cccccc;`}</span><span className="text-white">{`dNMWXXXWM0:`}</span><span className="text-primary">{`;cccccccccccccc:,
ccccccc;.:odl:.;cccccccccccccc:,.
cccccccccccccccccccccccccccc:'.
:ccccccccccccccccccc:;,..
 ':cccccccccccccccc::;,.`}</span>
                </pre>
                {/* System Info */}
                <div className="font-mono">
                  <div className="font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4">saran@fedora</div>
                  <div className="text-muted-foreground mt-1">----------</div>
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 mt-2 whitespace-normal break-words">
                    <span className="text-primary font-bold">OS:</span> <span>Fedora Linux 43</span>
                    <span className="text-primary font-bold">Shell:</span> <span>bash 5.3.0</span>
                    <span className="text-primary font-bold">DE:</span> <span>GNOME 49.1</span>
                    <span className="text-primary font-bold">CPU:</span> <span>Intel i5-12500H</span>
                    <span className="text-primary font-bold">Memory:</span> <span>15.30 GiB</span>
                  </div>
                  {/* Color blocks */}
                  <div className="flex gap-0 mt-4">
                    <div className="w-4 h-4 bg-primary" />
                    <div className="w-4 h-4 bg-accent" />
                    <div className="w-4 h-4 bg-[#E01B24]" />
                    <div className="w-4 h-4 bg-[#2EC27E]" />
                    <div className="w-4 h-4 bg-[#F5C211]" />
                    <div className="w-4 h-4 bg-[#9141AC]" />
                    <div className="w-4 h-4 bg-white" />
                    <div className="w-4 h-4 bg-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
