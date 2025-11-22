import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Bolt from "../components/Bolt";
import gsap from "gsap";

export type WheelType = "classic" | "conical" | "wide";

type WheelsProps = {
  wheelType?: WheelType;
};

const WHEEL_MATERIALS: Record<
  WheelType,
  { color: string; metalness: number; roughness: number }
> = {
  classic: {
    color: "#f5f0d6",
    metalness: 0,
    roughness: 0.35,
  },
  conical: {
    color: "#fffdfa",
    metalness: 0,
    roughness: 0.3,
  },
  wide: {
    color: "#f4e8b7",
    metalness: 0,
    roughness: 0.4,
  },
};

const boltPositions: [number, number, number][] = [
  [0.242, -0.12, 0.256],
  [-0.206, -0.117, 0.256],
  [0.241, -0.117, 0.004],
  [-0.207, -0.12, 0.004],
];

const WHEEL_MODELS: Record<WheelType, string> = {
  classic: "/models/wheels/classic-wheel.glb",
  conical: "/models/wheels/conical-wheel.glb",
  wide: "/models/wheels/wide-wheel.glb",
};

export default function Wheels({ wheelType }: WheelsProps) {
  const type: WheelType = wheelType ?? "classic";

  const wheelRefs = useRef<THREE.Group[]>([]);
  const boltRefs = useRef<THREE.Group[]>([]);

  const { scene } = useGLTF(WHEEL_MODELS[type]);

  const w1 = useMemo(() => scene.clone(true), [scene]); // front-left
  const w2 = useMemo(() => scene.clone(true), [scene]); // front-right
  const w3 = useMemo(() => scene.clone(true), [scene]); // back-left
  const w4 = useMemo(() => scene.clone(true), [scene]); // back-right
  const wheelMeshes = [w1, w2, w3, w4];

  useLayoutEffect(() => {
    const cfg = WHEEL_MATERIALS[type];

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cfg.color),
      metalness: cfg.metalness,
      roughness: cfg.roughness,
    });

    wheelMeshes.forEach((root) => {
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = mat;
        }
      });
    });
  }, [type, w1, w2, w3, w4]);

  useEffect(() => {
    const wheelSlide = 0.08;
    const boltSlide = 0.05;

    wheelRefs.current.forEach((g, idx) => {
      if (!g) return;
      const isLeft = idx % 2 === 0;
      const dir = isLeft ? 1 : -1;

      g.position.set(0, 0, dir * wheelSlide);

      gsap.to(g.position, {
        z: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: idx * 0.03,
      });
    });

    boltRefs.current.forEach((g, idx) => {
      if (!g) return;

      const isFront = idx < 2;
      const dir = isFront ? 1 : -1;
      g.position.set(0, 0, dir * boltSlide);

      gsap.to(g.position, {
        z: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.15 + idx * 0.02,
      });
    });
  }, [type]);

  const truckX = 0.214;
  const backTruckX = -0.214;
  const y = -0.06;
  const wheelOffsetZ = 0.11;

  const setWheelRef = (idx: number) => (el: THREE.Group | null) => {
    if (el) wheelRefs.current[idx] = el;
  };

  const setBoltRef = (idx: number) => (el: THREE.Group | null) => {
    if (el) boltRefs.current[idx] = el;
  };

  return (
    <>
      {/* BOLTS */}
      {boltPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <group ref={setBoltRef(i)}>
            <Bolt
              scale={1.3}
              rotation={[0, 0, 0] as [number, number, number]}
            />
          </group>
        </group>
      ))}

      {/* WHEELS */}
      <group position={[truckX + 0.02, y, +wheelOffsetZ]}>
        <group ref={setWheelRef(0)}>
          <primitive object={w1} />
        </group>
      </group>

      <group position={[truckX + 0.02, y, -wheelOffsetZ]}>
        <group ref={setWheelRef(1)}>
          <primitive object={w2} />
        </group>
      </group>

      <group position={[backTruckX, y, +wheelOffsetZ]}>
        <group ref={setWheelRef(2)}>
          <primitive object={w3} />
        </group>
      </group>

      <group position={[backTruckX, y, -wheelOffsetZ]}>
        <group ref={setWheelRef(3)}>
          <primitive object={w4} />
        </group>
      </group>
    </>
  );
}
Object.values(WHEEL_MODELS).forEach((path) => useGLTF.preload(path));
