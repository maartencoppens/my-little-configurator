// src/three/Wheels.tsx
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Wheels() {
  const { scene } = useGLTF("/models/wheel_classic.glb");

  const w1 = useMemo(() => scene.clone(true), [scene]);
  const w2 = useMemo(() => scene.clone(true), [scene]);
  const w3 = useMemo(() => scene.clone(true), [scene]);
  const w4 = useMemo(() => scene.clone(true), [scene]);

  // ✏️ Posities – zelfde X als trucks, Z naar links/rechts, Y iets lager
  const truckX = 0.205; // zelfde als front truck
  const backTruckX = -0.205;
  const y = -0.046; // lager dan de truck-hanger
  const wheelOffsetZ = 0.085; // afstand naar links/rechts

  return (
    <>
      {/* Voorste truck, rechterkant */}
      <primitive object={w1} position={[truckX, y, +wheelOffsetZ]} />

      {/* Voorste truck, linkerkant */}
      <primitive object={w2} position={[truckX, y, -wheelOffsetZ]} />

      {/* Achterste truck, rechterkant */}
      <primitive object={w3} position={[backTruckX, y, +wheelOffsetZ]} />

      {/* Achterste truck, linkerkant */}
      <primitive object={w4} position={[backTruckX, y, -wheelOffsetZ]} />
    </>
  );
}

useGLTF.preload("/models/wheel_classic.glb");
