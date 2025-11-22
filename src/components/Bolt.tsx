import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { JSX } from "react";

export default function Bolt(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/wheels/wheel-bolt.glb");

  const sceneClone = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={sceneClone} {...props} />;
}
