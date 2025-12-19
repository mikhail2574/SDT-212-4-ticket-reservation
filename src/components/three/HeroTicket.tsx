'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HeroTicket() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y = Math.sin(t * 1.3) * 0.2;
  });
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[2.2, 1.2, 0.05]} />
      <meshStandardMaterial metalness={0.6} roughness={0.2} />
    </mesh>
  );
}
