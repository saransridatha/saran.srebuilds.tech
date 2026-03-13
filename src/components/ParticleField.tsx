import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const CONNECTION_DISTANCE = 2.2;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const [themeTick, setThemeTick] = useState(0);

  // Listen for theme changes on the root element
  useEffect(() => {
    const observer = new MutationObserver(() => setThemeTick(t => t + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  const colors = useMemo(() => {
    const c = new Float32Array(PARTICLE_COUNT * 3);
    const style = getComputedStyle(document.documentElement);
    const primaryStr = style.getPropertyValue('--primary').trim();
    const accentStr = style.getPropertyValue('--accent').trim();
    
    const primaryColor = new THREE.Color(`hsl(${primaryStr || '211, 68%, 55%'})`);
    const accentColor = new THREE.Color(`hsl(${accentStr || '185, 80%, 55%'})`);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = Math.random() > 0.5 ? primaryColor : accentColor;
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return c;
  }, [themeTick]);

  const lineGeo = useRef<THREE.BufferGeometry>(null);
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 0.1 * 6), []);
  const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 0.1 * 6), []);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3] + (mx - pos[i3]) * 0.0003;
      pos[i3 + 1] += velocities[i3 + 1] + (my - pos[i3 + 1]) * 0.0003;
      pos[i3 + 2] += velocities[i3 + 2];

      for (let j = 0; j < 3; j++) {
        const bound = j === 2 ? 5 : 10;
        if (pos[i3 + j] > bound) pos[i3 + j] = -bound;
        if (pos[i3 + j] < -bound) pos[i3 + j] = bound;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    const style = getComputedStyle(document.documentElement);
    const primaryStr = style.getPropertyValue('--primary').trim();
    const lColor = new THREE.Color(`hsl(${primaryStr || '211, 68%, 55%'})`);

    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE && lineIdx < linePositions.length / 6) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const li = lineIdx * 6;
          linePositions[li] = pos[i * 3];
          linePositions[li + 1] = pos[i * 3 + 1];
          linePositions[li + 2] = pos[i * 3 + 2];
          linePositions[li + 3] = pos[j * 3];
          linePositions[li + 4] = pos[j * 3 + 1];
          linePositions[li + 5] = pos[j * 3 + 2];
          for (let k = 0; k < 6; k += 3) {
            lineColors[li + k] = lColor.r * alpha;
            lineColors[li + k + 1] = lColor.g * alpha;
            lineColors[li + k + 2] = lColor.b * alpha;
          }
          lineIdx++;
        }
      }
    }

    if (lineGeo.current) {
      lineGeo.current.setDrawRange(0, lineIdx * 2);
      lineGeo.current.attributes.position.needsUpdate = true;
      lineGeo.current.attributes.color.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={PARTICLE_COUNT} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={PARTICLE_COUNT} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry ref={lineGeo}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} count={linePositions.length / 3} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} count={lineColors.length / 3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
