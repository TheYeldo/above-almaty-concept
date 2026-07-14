"use client";

import { Float } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export function MountainEnvironment({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const particles = useMemo(() => {
    const count = reducedMotion ? 16 : 62;
    const values = new Float32Array(count * 3);
    const random = (seed: number) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    };
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (random(index + 1) - 0.5) * 22;
      values[index * 3 + 1] = random(index + 73) * 16 - 2;
      values[index * 3 + 2] = (random(index + 151) - 0.5) * 10 - 3;
    }
    return values;
  }, [reducedMotion]);

  return (
    <group>
      <group position={[0, -5.1, -10]}>
        {[-9, -5, -1, 3, 7].map((x, index) => (
          <mesh key={x} position={[x, index % 2 ? 1.1 : 0, 0]} rotation={[0, 0, index % 2 ? -0.1 : 0.08]}>
            <coneGeometry args={[4.8 + (index % 2), 6.5 + index * 0.35, 4]} />
            <meshStandardMaterial color={progress > 0.72 ? "#4b443d" : "#758287"} roughness={0.9} transparent opacity={0.72} />
          </mesh>
        ))}
      </group>
      <group position={[0, -5.4, -2]}>
        {Array.from({ length: 18 }).map((_, index) => (
          <mesh key={index} position={[(index - 9) * 1.05, (index % 4) * 0.28, -1 - (index % 3)]}>
            <boxGeometry args={[0.54 + (index % 3) * 0.18, 0.8 + (index % 5) * 0.22, 0.55]} />
            <meshStandardMaterial color="#202a2d" emissive={progress > 0.82 ? "#8f7146" : "#111718"} emissiveIntensity={progress > 0.82 ? 0.8 : 0.08} />
          </mesh>
        ))}
      </group>
      <Float speed={reducedMotion ? 0 : 0.35} rotationIntensity={0} floatIntensity={0.3}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.025} color="#e2ded4" transparent opacity={0.58} sizeAttenuation />
        </points>
      </Float>
      <mesh position={[0, 3.5, -12]}>
        <planeGeometry args={[36, 19]} />
        <meshBasicMaterial color={new THREE.Color(progress > 0.84 ? "#090b0c" : progress > 0.55 ? "#a78669" : "#5d7077")} />
      </mesh>
    </group>
  );
}
