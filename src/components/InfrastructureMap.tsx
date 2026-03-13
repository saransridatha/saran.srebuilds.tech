import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  core: "#22c55e", // Green
  auto: "#06b6d4", // Cyan
  cloud: "#3b82f6", // Blue
  data: "#a855f7", // Purple
};

const skillNodes = [
  // Compute & Core (Green) - Central Foundation
  { id: "linux", label: "Linux", position: [0, 0, 0] as [number, number, number], group: "core" },
  { id: "go", label: "Go", position: [-1.5, 1, 0.5] as [number, number, number], group: "core" },
  { id: "python", label: "Python", position: [-1.5, -1, 0.5] as [number, number, number], group: "core" },
  { id: "bash", label: "Bash", position: [-1, 0, 1.8] as [number, number, number], group: "core" },
  { id: "cpp", label: "C/C++", position: [-2, 0, -1] as [number, number, number], group: "core" },
  { id: "systemd", label: "Systemd", position: [0, -1.5, 0] as [number, number, number], group: "core" },

  // Automation & CI/CD (Cyan) - Left Wing
  { id: "git", label: "Git", position: [-3.5, 1.5, 2] as [number, number, number], group: "auto" },
  { id: "jenkins", label: "Jenkins", position: [-3.5, 0, 3] as [number, number, number], group: "auto" },
  { id: "gh-actions", label: "GH Actions", position: [-3.5, -1.5, 2] as [number, number, number], group: "auto" },
  { id: "n8n", label: "n8n", position: [-5, 0, 1] as [number, number, number], group: "auto" },
  { id: "shell", label: "Shell Script", position: [-2.5, 3, 1] as [number, number, number], group: "auto" },

  // Cloud & Orchestration (Blue) - Right Wing
  { id: "docker", label: "Docker", position: [2.5, 1, 1.5] as [number, number, number], group: "cloud" },
  { id: "podman", label: "Podman", position: [2.5, -1, 1.5] as [number, number, number], group: "cloud" },
  { id: "k8s", label: "Kubernetes", position: [4.5, 0, 0] as [number, number, number], group: "cloud" },
  { id: "aws", label: "AWS", position: [6, 2, -2] as [number, number, number], group: "cloud" },
  { id: "gcp", label: "GCP", position: [6, -2, -2] as [number, number, number], group: "cloud" },

  // Data & Reliability (Purple) - Integrated spread
  { id: "postgres", label: "PostgreSQL", position: [1.2, 2.8, -1.5] as [number, number, number], group: "data" },
  { id: "mongodb", label: "MongoDB", position: [2.8, 2.8, -1] as [number, number, number], group: "data" },
  { id: "redis", label: "Redis", position: [2.8, -2.8, -1] as [number, number, number], group: "data" },
  { id: "kafka", label: "Kafka", position: [1.2, -2.8, -1.5] as [number, number, number], group: "data" },
  { id: "prometheus", label: "Prometheus", position: [0, 3.2, 0] as [number, number, number], group: "data" },
  { id: "grafana", label: "Grafana", position: [0, 4, -0.8] as [number, number, number], group: "data" },
];

const connections = [
  ["go", "git"], ["python", "git"], ["bash", "git"], ["cpp", "git"], ["shell", "git"],
  ["git", "gh-actions"], ["git", "jenkins"],
  ["gh-actions", "docker"], ["jenkins", "docker"],
  ["gh-actions", "podman"], ["jenkins", "podman"],
  ["docker", "k8s"], ["podman", "k8s"],
  ["k8s", "aws"], ["k8s", "gcp"],
  ["linux", "systemd"], ["linux", "prometheus"], ["shell", "linux"],
  ["k8s", "prometheus"], ["prometheus", "grafana"],
  ["aws", "postgres"], ["aws", "mongodb"], ["aws", "redis"], ["aws", "kafka"],
];

function Scene({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Adjusted bobbing to be centered around the new offset
      groupRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[-0.5, -0.5, 0]}>
      {skillNodes.map((node) => {
        const color = COLORS[node.group as keyof typeof COLORS];
        return (
          <group key={node.id} position={node.position}>
            <Sphere args={[0.08, 16, 16]}>
              <meshBasicMaterial 
                color={isHovered ? color : "#475569"} 
                transparent 
                opacity={isHovered ? 1 : 0.4} 
              />
            </Sphere>
            {isHovered && (
               <Sphere args={[0.12, 16, 16]}>
                 <meshBasicMaterial color={color} transparent opacity={0.2} />
               </Sphere>
            )}
            <Text
              position={[0, 0.4, 0]}
              fontSize={0.25}
              color={isHovered ? "#fff" : "#64748b"}
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t64vAd_S3pQsS67qXUj482R9q8mD_.woff"
            >
              {node.label}
            </Text>
          </group>
        );
      })}

      {connections.map(([startId, endId], i) => {
        const startNode = skillNodes.find(n => n.id === startId);
        const endNode = skillNodes.find(n => n.id === endId);
        if (!startNode || !endNode) return null;
        const lineColor = COLORS[startNode.group as keyof typeof COLORS];
        
        return (
          <Line
            key={i}
            points={[startNode.position, endNode.position]}
            color={isHovered ? lineColor : "#334155"}
            lineWidth={isHovered ? 1.5 : 0.5}
            transparent
            opacity={isHovered ? 0.4 : 0.05}
          />
        );
      })}
    </group>
  );
}

export default function InfrastructureMap() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="h-[800px] w-full bg-black/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-xl relative group transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-8 left-8 z-10 space-y-2 pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 text-primary">
          <span className={`h-2 w-2 rounded-full ${isHovered ? 'bg-primary animate-pulse' : 'bg-red-500'}`} />
          Infrastructure Topology // Status: {isHovered ? 'Active_Stream' : 'Standby'}
        </div>
        <div className="flex gap-4 opacity-70">
          {Object.entries(COLORS).map(([group, color]) => (
            <div key={group} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-[8px] text-muted-foreground uppercase">{group}</span>
            </div>
          ))}
        </div>
      </div>
      
      <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Scene isHovered={isHovered} />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate={!isHovered} 
            autoRotateSpeed={0.5}
            maxDistance={25}
            minDistance={8}
          />
        </Suspense>
      </Canvas>

      <div className={`absolute bottom-8 right-8 z-10 font-mono text-[9px] text-muted-foreground/60 text-right pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-20'}`}>
        [ SCROLL TO ZOOM ]<br />
        [ SYSTEM_MAP: OPTIMIZED ]
      </div>
    </div>
  );
}
