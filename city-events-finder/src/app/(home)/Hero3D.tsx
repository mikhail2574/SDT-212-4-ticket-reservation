'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { isWebGLAvailable, prefersReducedMotion } from '@/lib/webgl';

const ThreeStage = dynamic(() => import('@/components/three/ThreeStage'), { ssr: false });
const HeroTicket = dynamic(() => import('@/components/three/HeroTicket').then(m => m.HeroTicket), { ssr: false });

export default function Hero3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const on = process.env.NEXT_PUBLIC_ENABLE_3D === 'true' && isWebGLAvailable() && !prefersReducedMotion();
    setEnabled(on);
  }, []);
  if (!enabled) return <div className="h-64 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />;
  return (
    <div className="h-64 rounded-2xl overflow-hidden">
      <ThreeStage>
        <HeroTicket />
      </ThreeStage>
    </div>
  );
}
