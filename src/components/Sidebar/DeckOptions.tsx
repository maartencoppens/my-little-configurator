type DeckGraphic = "flame" | "minimal" | "galaxy";

type Props = {
  deckGraphic: DeckGraphic;
  setDeckGraphic: (g: DeckGraphic) => void;
};

export default function DeckOptions({ deckGraphic, setDeckGraphic }: Props) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-2">
        Deck graphic
      </h2>
      <div className="flex flex-col gap-2">
        {[
          { id: "flame", label: "Flame" },
          { id: "minimal", label: "Minimal" },
          { id: "galaxy", label: "Galaxy" },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setDeckGraphic(g.id as DeckGraphic)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
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
