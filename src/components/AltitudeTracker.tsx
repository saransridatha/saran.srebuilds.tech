import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const checkpoints = [
  { label: "BASECAMP", altitude: 5364, trigger: "#about" },
  { label: "ICEFALL", altitude: 6100, trigger: "#experience" },
  { label: "CAMP III", altitude: 7200, trigger: "#projects" },
  { label: "SOUTH COL", altitude: 7906, trigger: "#skills" },
  { label: "SUMMIT", altitude: 8848, trigger: "#contact" },
];

export default function AltitudeTracker() {
  const [altitude, setAltitude] = useState(5364);
  const [location, setLabel] = useState("START");

  useEffect(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    const onScroll = () => {
      const progress = window.scrollY / totalHeight;
      const currentAlt = Math.floor(5364 + (progress * (8848 - 5364)));
      setAltitude(currentAlt);
    };

    window.addEventListener("scroll", onScroll);

    checkpoints.forEach((cp) => {
      ScrollTrigger.create({
        trigger: cp.trigger,
        start: "top center",
        onEnter: () => setLabel(cp.label),
        onEnterBack: () => setLabel(cp.label),
      });
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6 group pointer-events-none">
      <div className="font-mono text-[10px] text-primary/40 uppercase tracking-[0.3em] vertical-text transform -rotate-180 mb-4">
        Expedition Path
      </div>
      
      <div className="h-64 w-[1px] bg-white/5 relative">
        <div 
          className="absolute top-0 left-0 w-full bg-primary shadow-[0_0_10px_var(--glow-primary)] transition-all duration-300"
          style={{ height: `${((altitude - 5364) / (8848 - 5364)) * 100}%` }}
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="font-mono text-[10px] text-primary font-bold">
          {altitude}m
        </div>
        <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest animate-pulse">
          {location}
        </div>
      </div>
    </div>
  );
}
