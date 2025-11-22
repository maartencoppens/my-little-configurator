import DeckOptions from "./DeckOptions";
import TruckOptions from "./TruckOptions";
import WheelOptions from "./WheelOptions";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Part = "deck" | "trucks" | "wheels" | null;
type DeckGraphic = "blind" | "girl" | "supreme";
type WheelType = "classic" | "conical" | "wide";
type TruckColor = "raw" | "black" | "gold";

type Props = {
  selectedPart: Part;
  deckGraphic: DeckGraphic;
  setDeckGraphic: (g: DeckGraphic) => void;
  wheelType: WheelType;
  setWheelType: (w: WheelType) => void;
  truckColor: TruckColor;
  setTruckColor: (c: TruckColor) => void;
  setDeckChosen: (b: boolean) => void;
  setWheelChosen: (b: boolean) => void;
  setTruckChosen: (b: boolean) => void;
};

export default function ConfigSidebar({
  selectedPart,
  deckGraphic,
  setDeckGraphic,
  wheelType,
  setWheelType,
  truckColor,
  setTruckColor,
  setDeckChosen,
  setWheelChosen,
  setTruckChosen,
}: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 0.8, duration: 0.8, ease: "power2.out", delay: 0.05 }
    );
  }, []);
  return (
    <div
      ref={elRef}
      style={{ opacity: 0 }}
      className="w-full p-6 text-white flex flex-col gap-6 z-20 border-r border-white/10 bg-black/80 rounded-xl backdrop-blur-md"
    >
      {selectedPart === null && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-2">
            Wat je doet
          </h2>
          <p className="text-sm text-white/70 mb-4">
            Selecteer een onderdeel in de 3D-view of klik op een optie om het
            skateboard aan te passen. Hieronder zie je je huidige keuzes.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Deck</span>
              <span className="inline-block px-2 py-1 rounded-md text-sm border bg-white/10 border-white/20">
                {deckGraphic}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Trucks</span>
              <span className="inline-block px-2 py-1 rounded-md text-sm border bg-white/10 border-white/20">
                {truckColor}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Wheels</span>
              <span className="inline-block px-2 py-1 rounded-md text-sm border bg-white/10 border-white/20">
                {wheelType}
              </span>
            </div>
          </div>
        </section>
      )}

      {selectedPart === "deck" && (
        <DeckOptions
          deckGraphic={deckGraphic}
          setDeckGraphic={setDeckGraphic}
          setDeckChosen={setDeckChosen}
        />
      )}

      {selectedPart === "trucks" && (
        <TruckOptions
          truckColor={truckColor}
          setTruckColor={setTruckColor}
          setTruckChosen={setTruckChosen}
        />
      )}

      {selectedPart === "wheels" && (
        <WheelOptions
          wheelType={wheelType}
          setWheelType={setWheelType}
          setWheelChosen={setWheelChosen}
        />
      )}
    </div>
  );
}
