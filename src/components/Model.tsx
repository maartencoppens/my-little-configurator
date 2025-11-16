import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("/models/deck.glb");

export default function Model() {
  const model = useGLTF("/models/Deck-2.glb");

  const controls = useControls({ position: { value: [0, 0, 0], step: 0.1 } });
  console.log(controls.position);

  useLayoutEffect(() => {
    if (!model) return;

    model.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.computeBoundingBox();
        const box = mesh.geometry.boundingBox;
        if (!box) return;

        const center = new THREE.Vector3();
        box.getCenter(center);

        // schuif de geometrie zodat het centrum naar (0,0,0) gaat
        mesh.geometry.translate(-center.x, -center.y, -center.z);
      }
    });
  }, [model]);

  // const modelRef = useRef<THREE.Object3D | null>(null);
  // useFrame(() => {
  //   modelRef.current!.rotation.z += 0.01;
  // });

  return (
    <primitive
      object={model.scene}
      scale={2}
      position-x={0.7}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}
//       ref={modelRef}
//
