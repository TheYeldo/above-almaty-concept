"use client";

import { useEffect, useState } from "react";

export function useWebGL() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setSupported(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch {
        setSupported(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return supported;
}
