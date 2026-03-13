import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;

    const move = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
    };

    const animate = () => {
      tx += (cx - tx) * 0.12;
      ty += (cy - ty) * 0.12;
      trail.style.transform = `translate(${tx - 20}px, ${ty - 20}px)`;
      requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-magnetic]")) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full transition-transform duration-75 ${
          hovering ? "opacity-0" : "bg-primary opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
      <div
        ref={trailRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-primary transition-all duration-300 ${
          hovering
            ? "h-16 w-16 opacity-100 bg-primary"
            : "h-12 w-12 opacity-30"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
