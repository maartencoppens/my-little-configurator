// src/components/DeckOptions.tsx
type TruckColor = "raw" | "black" | "gold";

type Props = {
  truckColor: TruckColor;
  setTruckColor: (c: TruckColor) => void;
};

export default function TruckOptions({ truckColor, setTruckColor }: Props) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-2">
        Truck color
      </h2>
      <div className="flex flex-col gap-2">
        {[
          { id: "raw", label: "Raw" },
          { id: "black", label: "Black" },
          { id: "gold", label: "Gold" },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setTruckColor(g.id as TruckColor)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
              truckColor === g.id
                ? "bg-white text-black border-white"
                : "bg-white/10 border-white/20 hover:bg-white/20"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
    </section>
  );
}
