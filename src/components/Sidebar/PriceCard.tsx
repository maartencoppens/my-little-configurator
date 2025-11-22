import { usePriceStore } from "../../stores/PriceStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type DeckGraphic = "blind" | "girl" | "supreme";
type WheelType = "classic" | "conical" | "wide";
type TruckColor = "raw" | "black" | "gold";

type PriceCardProps = {
  deckGraphic: DeckGraphic;
  wheelType: WheelType;
  truckColor: TruckColor;
  deckChosen?: boolean;
  wheelChosen?: boolean;
  truckChosen?: boolean;
};

export const PriceCard = ({
  deckGraphic,
  wheelType,
  truckColor,
  deckChosen = false,
  wheelChosen = false,
  truckChosen = false,
}: PriceCardProps) => {
  const { computePrices } = usePriceStore();

  const { deckPrice, trucksPrice, wheelsPrice, total, format } = computePrices(
    deckGraphic,
    wheelType,
    truckColor,
    deckChosen,
    wheelChosen,
    truckChosen
  );

  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 0.8, duration: 0.8, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <div>
      <section
        ref={elRef as any}
        style={{ opacity: 0 }}
        className="w-full bg-black/80 border border-white/10 rounded-xl p-4 text-white backdrop-blur-md"
      >
        <ul className="space-y-2">
          <li className="flex justify-between items-center text-sm">
            <span className="truncate">Deck ({deckGraphic})</span>
            <span className="ml-2">{format(deckPrice)}</span>
          </li>

          <li className="flex justify-between items-center text-sm">
            <span className="truncate">Trucks ({truckColor})</span>
            <span className="ml-2">{format(trucksPrice)}</span>
          </li>

          <li className="flex justify-between items-center text-sm">
            <span className="truncate">Wheels ({wheelType})</span>
            <span className="ml-2">{format(wheelsPrice)}</span>
          </li>

          <li className="flex justify-between items-center text-sm pt-2 border-t">
            <span className="truncate font-semibold">Total</span>
            <span className="ml-2 font-semibold">{format(total)}</span>
          </li>
        </ul>
        <div className="mt-3">
          <button
            type="button"
            className="uppercase px-6 py-3 text-base bg-primary text-text-label rounded-md block w-full text-center"
          >
            Confirm
          </button>
        </div>
      </section>
    </div>
  );
};
