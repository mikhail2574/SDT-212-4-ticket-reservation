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
  if (!enabled) return <div className="h-64 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow)]" />;
  return (
    <div className="h-64 rounded-2xl overflow-hidden border border-[var(--border)] shadow-[var(--shadow)]">
      <ThreeStage>
        <HeroTicket />
      </ThreeStage>
    </div>
  );
}
