import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MountainRidge() {
  const ridgeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ridgeRef.current) return;

    gsap.to(ridgeRef.current, {
      scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.5,
      },
      y: -150,
      ease: "none",
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden pointer-events-none z-0 h-[300px] mt-[-150px]">
      <svg
        ref={ridgeRef}
        viewBox="0 0 1440 300"
        className="w-full h-full translate-y-32"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mountain-gradient-v2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-color, #3b82f6)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary-color, #3b82f6)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Background Peak */}
        <path
          d="M0 300L200 150L400 250L600 50L800 200L1000 100L1200 250L1440 150V300H0Z"
          fill="url(#mountain-gradient-v2)"
          className="text-primary"
          style={{ fill: 'currentColor', fillOpacity: 0.1 }}
        />
        
        {/* Main Ridge - Very Bold */}
        <path
          d="M0 300L150 200L350 250L550 100L750 220L950 80L1150 240L1350 180L1440 220"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Support lines */}
        <path d="M550 100V300" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
        <path d="M950 80V300" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
      </svg>
    </div>
  );
}
