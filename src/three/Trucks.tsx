import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";

export type TruckColor = "raw" | "black" | "gold";

const TRUCK_MATERIALS: Record<
  TruckColor,
  { color: string; metalness: number; roughness: number }
> = {
  raw: {
    color: "#f0f0f0",
    metalness: 0.85,
    roughness: 0.25,
  },
  black: {
    color: "#222222",
    metalness: 0.8,
    roughness: 0.35,
  },
  gold: {
    color: "#f7d36a",
    metalness: 0.9,
    roughness: 0.25,
  },
};

type Props = {
  truckColor: TruckColor;
};

export default function Trucks({ truckColor }: Props) {
  const { scene } = useGLTF("/models/truck.glb");

  const frontTruck = useMemo(() => scene.clone(true), [scene]);
  const backTruck = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const cfg = TRUCK_MATERIALS[truckColor];

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cfg.color),
      metalness: cfg.metalness,
      roughness: cfg.roughness,
    });

    [frontTruck, backTruck].forEach((root) => {
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = mat;
        }
      });
    });
  }, [truckColor, frontTruck, backTruck]);

  const x = 0.206;
  const y = -0.052;
  const z = 0;

  return (
    <>
      <primitive
        object={frontTruck}
        position={[x + 0.02, y, z]}
        rotation={[0, Math.PI, 0]}
        scale={1.3}
      />
      <primitive object={backTruck} position={[-x, y, z]} scale={1.3} />
    </>
  );
}

useGLTF.preload("/models/truck.glb");
