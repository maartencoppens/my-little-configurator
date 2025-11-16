// src/components/ConfigSidebar.tsx
import DeckOptions from "./DeckOptions";
import TruckOptions from "./TruckOptions";
import WheelOptions from "./WheelOptions";

type Part = "deck" | "trucks" | "wheels";
type DeckGraphic = "flame" | "minimal" | "galaxy";
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
};

export default function ConfigSidebar({
  selectedPart,
  deckGraphic,
  setDeckGraphic,
  wheelType,
  setWheelType,
  truckColor,
  setTruckColor,
}: Props) {
  return (
    <div className="w-72 p-4 text-white flex flex-col gap-6 z-20 border-r border-white/10 bg-black/80 rounded-xl backdrop-blur-md">
      {selectedPart === "deck" && (
        <DeckOptions
          deckGraphic={deckGraphic}
          setDeckGraphic={setDeckGraphic}
        />
      )}

      {selectedPart === "trucks" && (
        <TruckOptions truckColor={truckColor} setTruckColor={setTruckColor} />
      )}

      {selectedPart === "wheels" && (
        <WheelOptions wheelType={wheelType} setWheelType={setWheelType} />
      )}
    </div>
  );
}
