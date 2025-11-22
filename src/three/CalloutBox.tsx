import { Billboard, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import gsap from "gsap";

type CalloutProps = {
  anchor: [number, number, number];
  offset?: [number, number, number];
  onClick?: () => void;
  active?: boolean;
  icon: string;
};

export default function CalloutBox({
  anchor,
  offset = [0.3, 0.2, 0],
  onClick,
  active = false,
  icon,
}: CalloutProps) {
  const targetPos = useMemo<[number, number, number]>(
    () => [anchor[0] + offset[0], anchor[1] + offset[1], anchor[2] + offset[2]],
    [anchor, offset]
  );

  const tex = useTexture(icon) as THREE.Texture;
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    gsap.to(meshRef.current.scale, {
      x: active ? 1.2 : 1,
      y: active ? 1.2 : 1,
      z: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [active]);

  return (
    <>
      <Line points={[anchor, targetPos]} lineWidth={1} color="#e0e0e0" />

      <Billboard
        position={targetPos}
        follow
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <mesh ref={meshRef} onClick={onClick}>
          <planeGeometry args={[0.14, 0.14]} />
          <meshBasicMaterial
            map={tex}
            transparent
            alphaTest={0.4}
            depthWrite={false}
            side={THREE.DoubleSide}
            color={active ? "#000000" : "#222222"}
          />
        </mesh>
      </Billboard>
    </>
  );
}
