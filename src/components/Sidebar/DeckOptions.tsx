type DeckGraphic = "blind" | "girl" | "supreme";

type Props = {
  deckGraphic: DeckGraphic;
  setDeckGraphic: (g: DeckGraphic) => void;
  setDeckChosen?: (b: boolean) => void;
};

export default function DeckOptions({
  deckGraphic,
  setDeckGraphic,
  setDeckChosen,
}: Props) {
  return (
    <section>
      <h2 className="text-m font-semibold uppercase tracking-wide text-white/70 mb-5">
        Deck graphic
      </h2>
      <div className="flex flex-row flex-wrap gap-2">
        {[
          { id: "blind", label: "Blind" },
          { id: "girl", label: "Girl" },
          { id: "supreme", label: "Supreme" },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setDeckGraphic(g.id as DeckGraphic);
              setDeckChosen?.(true);
            }}
            className={`w-full text-left p-6 rounded-md text-sm border ${
              deckGraphic === g.id
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
