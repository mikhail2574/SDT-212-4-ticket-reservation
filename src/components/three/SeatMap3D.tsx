'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D } from 'three';
import { Seat } from '@/lib/types';

type Props = { seats: Seat[]; onClickSeat: (id: string) => void; };

export default function SeatMap3D({ seats, onClickSeat }: Props) {
  const dummy = useMemo(() => new Object3D(), []);
  // We assume that the mapping of Seat -> position on the stage has been done in advance
  const colors = useMemo(() => ({
    available: 0x88cc88,
    selected: 0x66a3ff,
    reserved: 0xcc8888
  }), []);

  const matrices = useMemo(() => seats, [seats]);

  useFrame(() => { /* nothing, if frameloop='always' is not needed */ });

  return (
    <instancedMesh args={[undefined, undefined, matrices.length]} onClick={(e) => {
      e.stopPropagation();
      const instanceId = (e.instanceId ?? 0);
      const seat = matrices[instanceId];
      if (seat?.status !== 'reserved') onClickSeat(seat.id);
    }}>
      <cylinderGeometry args={[0.14, 0.14, 0.05, 12]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}
