import { useGLTF } from "@react-three/drei";

export default function Deck() {
  const { scene } = useGLTF("/models/deck_800.glb");
  return <primitive object={scene} />;
}

useGLTF.preload("/models/deck_800.glb");
