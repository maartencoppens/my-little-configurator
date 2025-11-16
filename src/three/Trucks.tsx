// src/three/Trucks.tsx
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Trucks() {
  const { scene } = useGLTF("/models/truck.glb");

  const frontTruck = useMemo(() => scene.clone(true), [scene]);
  const backTruck = useMemo(() => scene.clone(true), [scene]);

  const x = 0.2;
  const y = -0.041;
  const z = 0;

  return (
    <>
      <primitive
        object={frontTruck}
        position={[x, y, z]}
        rotation={[0, Math.PI, 0]}
      />

      <primitive object={backTruck} position={[-x, y, z]} />
    </>
  );
}

useGLTF.preload("/models/truck.glb");
