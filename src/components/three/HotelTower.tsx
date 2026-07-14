"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const FLOOR_COUNT = 32;

export function HotelTower({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const tower = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const sign = useRef<THREE.Mesh>(null);
  const floors = useRef<Array<THREE.Group | null>>([]);
  const windowMaterials = useMemo(
    () => Array.from({ length: FLOOR_COUNT }, () => new THREE.MeshStandardMaterial({ color: "#66777a", metalness: 0.72, roughness: 0.2, transparent: true, opacity: 0.82 })),
    [],
  );

  useFrame((_, delta) => {
    const p = reducedMotion ? 1 : progress;
    if (tower.current) {
      const orbit = THREE.MathUtils.clamp((p - 0.18) / 0.45, 0, 1);
      tower.current.rotation.y = THREE.MathUtils.damp(tower.current.rotation.y, -0.19 + orbit * 0.54, 3.2, delta);
      tower.current.position.z = THREE.MathUtils.damp(tower.current.position.z, p > 0.79 ? 1.4 : 0, 3, delta);
    }
    if (core.current) {
      const coreProgress = THREE.MathUtils.smoothstep(p, 0.11, 0.28);
      core.current.scale.y = THREE.MathUtils.damp(core.current.scale.y, Math.max(0.015, coreProgress), 5, delta);
      core.current.position.y = -5.9 + coreProgress * 6.2;
    }
    floors.current.forEach((floor, index) => {
      if (!floor) return;
      const start = 0.18 + index * 0.009;
      const reveal = THREE.MathUtils.smoothstep(p, start, start + 0.095);
      const targetY = -5.45 + index * 0.38;
      floor.position.y = THREE.MathUtils.damp(floor.position.y, targetY - (1 - reveal) * 3.4, 7, delta);
      floor.scale.y = THREE.MathUtils.damp(floor.scale.y, Math.max(0.025, reveal), 7, delta);
      floor.rotation.y = THREE.MathUtils.damp(floor.rotation.y, (1 - reveal) * 0.08, 5, delta);

      const material = windowMaterials[index];
      const lightWave = THREE.MathUtils.smoothstep(p, 0.48 + index * 0.003, 0.7 + index * 0.002);
      material.emissive.set(progress > 0.82 || (index % 4 === 0 && lightWave > 0.2) ? "#9b7240" : "#0d1517");
      material.emissiveIntensity = progress > 0.82 ? 1.35 : 0.08 + lightWave * 0.46;
      material.opacity = THREE.MathUtils.lerp(0.35, 0.88, THREE.MathUtils.smoothstep(p, 0.38, 0.56));
    });
    if (sign.current) {
      const signProgress = THREE.MathUtils.smoothstep(p, 0.59, 0.68);
      sign.current.scale.x = THREE.MathUtils.damp(sign.current.scale.x, Math.max(0.001, signProgress), 5, delta);
    }
  });

  return (
    <group ref={tower}>
      <mesh position={[0, -5.82, 0]}>
        <boxGeometry args={[4.8, 0.34, 4]} />
        <meshStandardMaterial color="#202626" roughness={0.78} />
      </mesh>
      <mesh ref={core} position={[0, -5.8, 0]} scale={[1, 0.02, 1]}>
        <boxGeometry args={[1.5, 12.4, 1.35]} />
        <meshStandardMaterial color="#303638" metalness={0.55} roughness={0.42} />
      </mesh>
      {Array.from({ length: FLOOR_COUNT }).map((_, index) => {
        const taper = index > 25 ? 1 - (index - 25) * 0.025 : 1;
        return (
          <group
            key={index}
            ref={(element) => { floors.current[index] = element; }}
            position={[0, -8.8, 0]}
            scale={[taper, 0.025, taper]}
          >
            <mesh>
              <boxGeometry args={[3.25, 0.3, 2.62]} />
              <primitive object={windowMaterials[index]} attach="material" />
            </mesh>
            <mesh position={[0, -0.165, 0]}>
              <boxGeometry args={[3.38, 0.035, 2.74]} />
              <meshStandardMaterial color="#151c1d" metalness={0.8} roughness={0.24} />
            </mesh>
            {index % 3 === 0 && (
              <mesh position={[0, 0, 1.325]}>
                <boxGeometry args={[2.9, 0.055, 0.018]} />
                <meshBasicMaterial color="#b3d0d2" transparent opacity={0.55} />
              </mesh>
            )}
          </group>
        );
      })}
      <mesh ref={sign} position={[0, 6.45, 1.4]} scale={[0.001, 1, 1]}>
        <boxGeometry args={[2.25, 0.1, 0.03]} />
        <meshStandardMaterial color="#d7c6a7" emissive="#b79865" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}
