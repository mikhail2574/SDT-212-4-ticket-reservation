'use client';

import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf'; // optional, dev-only
import { Environment } from '@react-three/drei';
import { Suspense, PropsWithChildren } from 'react';

export default function ThreeStage({ children }: PropsWithChildren<{ }>) {
  const dev = process.env.NODE_ENV !== 'production';
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2.5, 6], fov: 45 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />
        <Environment preset="city" />
        {dev ? <Perf position="bottom-left" minimal /> : null}
        {children}
      </Suspense>
    </Canvas>
  );
}
