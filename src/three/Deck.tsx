import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

type DeckGraphic = "blind" | "girl" | "supreme";

type DeckProps = {
  selectedGraphic?: DeckGraphic;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

const graphicMap: Record<DeckGraphic, string> = {
  blind: "/textures/decks/blind.png",
  girl: "/textures/decks/girl.png",
  supreme: "/textures/decks/supreme.png",
};

export default function Deck({
  selectedGraphic = "blind",
  ...props
}: DeckProps) {
  const { scene } = useGLTF("/models/deck_800.glb");

  const deckScene = useMemo(() => scene.clone(true), [scene]);

  const graphicTexture = useTexture(graphicMap[selectedGraphic]);

  useEffect(() => {
    graphicTexture.flipY = true;

    deckScene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;

      if (mesh.name.toLowerCase().includes("bottom")) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.map = graphicTexture;
        mat.needsUpdate = true;
      }
    });
  }, [deckScene, graphicTexture]);

  return <primitive object={deckScene} {...props} />;
}

useGLTF.preload("/models/deck_800.glb");
