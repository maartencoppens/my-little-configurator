type WheelType = "classic" | "conical" | "wide";

type Props = {
  wheelType: WheelType;
  setWheelType: (w: WheelType) => void;
  setWheelChosen?: (b: boolean) => void;
};

export default function WheelOptions({
  wheelType,
  setWheelType,
  setWheelChosen,
}: Props) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-2">
        Wheel type
      </h2>
      <div className="flex flex-col gap-2">
        {[
          { id: "classic", label: "Classic" },
          { id: "conical", label: "Conical" },
          { id: "wide", label: "Wide" },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setWheelType(g.id as WheelType);
              setWheelChosen?.(true);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
              wheelType === g.id
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
