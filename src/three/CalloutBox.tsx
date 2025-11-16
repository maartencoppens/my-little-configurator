// src/three/CalloutBox.tsx
import { Billboard, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

type CalloutProps = {
  anchor: [number, number, number];
  offset?: [number, number, number];
  onClick?: () => void;
  active?: boolean;
};

export default function CalloutBox({
  anchor,
  offset = [0.3, 0.2, 0],
  onClick,
  active = false,
}: CalloutProps) {
  const squarePos = useMemo<[number, number, number]>(
    () => [anchor[0] + offset[0], anchor[1] + offset[1], anchor[2] + offset[2]],
    [anchor, offset]
  );

  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    if (active) {
      gsap.fromTo(
        meshRef.current.scale,
        { x: 1, y: 1, z: 1 },
        { x: 1.3, y: 1.3, z: 1, duration: 0.2, yoyo: true, repeat: 1 }
      );
    } else {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.2,
      });
    }
  }, [active]);

  return (
    <>
      <Line points={[anchor, squarePos]} lineWidth={1} />
      <Billboard position={squarePos}>
        <mesh ref={meshRef} onClick={onClick}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial
            color={active ? "#ff5533" : "white"} // oranje als hij actief is
          />
        </mesh>
      </Billboard>
    </>
  );
}
