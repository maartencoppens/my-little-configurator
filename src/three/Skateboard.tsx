// src/three/Skateboard.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import Deck from "./Deck";
import Trucks from "./Trucks";
import Wheels from "./Wheels";
import CalloutBox from "./CalloutBox";

type Part = "deck" | "trucks" | "wheels" | null;
type DeckGraphic = "flame" | "minimal" | "galaxy";
type WheelType = "classic" | "conical" | "wide";
type TruckColor = "raw" | "black" | "gold";

export default function Skateboard({
  selectedPart,
  setSelectedPart,
  deckGraphic,
  wheelType,
  truckColor,
}: {
  selectedPart: Part;
  setSelectedPart: (p: Part) => void;
  deckGraphic: DeckGraphic;
  wheelType: WheelType;
  truckColor: TruckColor;
}) {
  const boardRef = useRef<THREE.Group | null>(null);

  // 🔹 nieuwe basispose – goed voor desktop & tablet
  const basePos = { x: 0, y: -0.035, z: 0 };
  const baseRot = { x: 0.18, y: 0, z: 0 };
  const baseScale = 1.2;

  useEffect(() => {
    if (!boardRef.current) return;

    // eerst alle oude tweens killen
    gsap.killTweensOf([
      boardRef.current.position,
      boardRef.current.rotation,
      boardRef.current.scale,
    ]);

    const base = {
      pos: { ...basePos },
      rot: { ...baseRot },
      scale: baseScale,
    };

    // 🔹 target per onderdeel (nieuw afgesteld)
    let target = base;

    if (selectedPart === "deck") {
      target = {
        pos: { x: basePos.x, y: basePos.y - 0.09, z: basePos.z + 0.04 },
        rot: { x: Math.PI, y: 0.22, z: 0 },
        scale: baseScale * 1.35,
      };
    } else if (selectedPart === "trucks") {
      target = {
        pos: { x: basePos.x + 0.11, y: basePos.y - 0.07, z: basePos.z + 0.1 },
        rot: { x: Math.PI * 0.86, y: 0.6, z: 0 },
        scale: baseScale * 1.5,
      };
    } else if (selectedPart === "wheels") {
      target = {
        pos: { x: basePos.x + 0.15, y: basePos.y - 0.08, z: basePos.z + 0.14 },
        rot: { x: Math.PI * 0.92, y: 0.95, z: 0 },
        scale: baseScale * 1.6,
      };
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (selectedPart == null) {
      // terug naar basis
      tl.to(boardRef.current.position, {
        x: base.pos.x,
        y: base.pos.y,
        z: base.pos.z,
        duration: 0.6,
      })
        .to(
          boardRef.current.rotation,
          { x: base.rot.x, y: base.rot.y, z: base.rot.z, duration: 0.6 },
          "<"
        )
        .to(
          boardRef.current.scale,
          {
            x: base.scale,
            y: base.scale,
            z: base.scale,
            duration: 0.6,
          },
          "<"
        );
    } else {
      // eerst kort naar basis, dan cinematic naar target
      tl.to(boardRef.current.position, {
        x: base.pos.x,
        y: base.pos.y,
        z: base.pos.z,
        duration: 0.35,
      })
        .to(
          boardRef.current.rotation,
          { x: base.rot.x, y: base.rot.y, z: base.rot.z, duration: 0.35 },
          "<"
        )
        .to(
          boardRef.current.scale,
          {
            x: base.scale,
            y: base.scale,
            z: base.scale,
            duration: 0.35,
          },
          "<"
        )
        .to(boardRef.current.position, {
          x: target.pos.x,
          y: target.pos.y,
          z: target.pos.z,
          duration: 0.7,
        })
        .to(
          boardRef.current.rotation,
          {
            x: target.rot.x,
            y: target.rot.y,
            z: target.rot.z,
            duration: 0.7,
          },
          "<"
        )
        .to(
          boardRef.current.scale,
          {
            x: target.scale,
            y: target.scale,
            z: target.scale,
            duration: 0.7,
          },
          "<"
        );
    }
  }, [
    selectedPart,
    basePos.x,
    basePos.y,
    basePos.z,
    baseRot.x,
    baseRot.y,
    baseScale,
  ]);

  return (
    <group
      ref={boardRef}
      position={[basePos.x, basePos.y, basePos.z]}
      rotation={[baseRot.x, baseRot.y, baseRot.z]}
      scale={baseScale}
    >
      <Deck />
      <Trucks /* later: truckColor */ />
      <Wheels /* later: wheelType */ />

      {/* Callouts */}
      <CalloutBox
        anchor={[0, 0.02, 0]}
        offset={[0.4, 0.2, 0]}
        active={selectedPart === "deck"}
        onClick={() => setSelectedPart("deck")}
      />
      <CalloutBox
        anchor={[0.2, -0.04, 0]}
        offset={[0.4, 0.0, 0]}
        active={selectedPart === "trucks"}
        onClick={() => setSelectedPart("trucks")}
      />
      <CalloutBox
        anchor={[0.205, -0.046, 0.085]}
        offset={[0.4, -0.1, 0]}
        active={selectedPart === "wheels"}
        onClick={() => setSelectedPart("wheels")}
      />
    </group>
  );
}
