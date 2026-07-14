"use client";

/* R3F animation frames intentionally mutate Three.js scene objects. */
/* eslint-disable react-hooks/immutability */

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, type ErrorInfo, type ReactNode, Suspense, useEffect } from "react";
import * as THREE from "three";
import { HotelTower } from "./HotelTower";
import { MountainEnvironment } from "./MountainEnvironment";
import { ReducedMotionFallback } from "./ReducedMotionFallback";

type Props = { progress: number; reducedMotion: boolean; active?: boolean };

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn("3D scene unavailable", error, info.componentStack); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function CameraRig({ progress, reducedMotion }: Props) {
  const { camera, gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
  }, [gl]);

  useFrame((_, delta) => {
    const p = reducedMotion ? 0.58 : progress;
    const build = THREE.MathUtils.clamp(p / 0.56, 0, 1);
    const ascend = THREE.MathUtils.smoothstep(p, 0.55, 0.82);
    const portal = THREE.MathUtils.smoothstep(p, 0.8, 1);
    const angle = -0.08 + build * 0.5;
    const radius = THREE.MathUtils.lerp(11.7, 10.2, build) - portal * 7.1;
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    const targetY = THREE.MathUtils.lerp(-1.8, 1.1, build) + ascend * 8.8;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.7, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.7, delta);
    const lookY = THREE.MathUtils.lerp(0.6, 4.8, ascend);
    camera.lookAt(0, lookY, portal * 0.9);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, 42 + portal * 24, 2.7, delta);
      camera.updateProjectionMatrix();
    }
    gl.toneMappingExposure = THREE.MathUtils.damp(gl.toneMappingExposure, 0.9 + portal * 0.82, 2.4, delta);
  });

  return null;
}

export default function SceneCanvas({ active = true, ...props }: Props) {
  return (
    <SceneErrorBoundary fallback={<ReducedMotionFallback />}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, -1.8, 11.7], fov: 42, near: 0.1, far: 70 }}
        performance={{ min: 0.55 }}
      >
        <color attach="background" args={[props.progress > 0.83 ? "#080b0d" : props.progress > 0.6 ? "#9a806d" : "#52656c"]} />
        <fog attach="fog" args={[props.progress > 0.8 ? "#101214" : "#66787c", 12, 30]} />
        <ambientLight intensity={props.progress > 0.78 ? 0.52 : 0.72} color="#c8d2ce" />
        <directionalLight position={[-6, 10, 7]} intensity={2.1} color={props.progress > 0.55 ? "#e3b486" : "#cadce0"} />
        <pointLight position={[4, 6, 3]} intensity={props.progress > 0.76 ? 7 : 1.2} color="#d5a260" distance={16} />
        <Suspense fallback={null}>
          <MountainEnvironment {...props} />
          <HotelTower {...props} />
          <CameraRig {...props} />
          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}
