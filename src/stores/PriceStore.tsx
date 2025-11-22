import React, { createContext, useContext, useMemo, useState } from "react";

type DeckGraphic = "blind" | "girl" | "supreme";
type WheelType = "classic" | "conical" | "wide";
type TruckColor = "raw" | "black" | "gold";

type PriceMap = {
  deck: Record<DeckGraphic, number>;
  trucks: Record<TruckColor, number>;
  wheels: Record<WheelType, number>;
};

type ComputedPrices = {
  deckPrice: number;
  trucksPrice: number;
  wheelsPrice: number;
  total: number;
  format: (n: number) => string;
};

type PriceContextValue = {
  prices: PriceMap;
  setPrices: (p: Partial<PriceMap>) => void;
  computePrices: (
    deckGraphic: DeckGraphic,
    wheelType: WheelType,
    truckColor: TruckColor,
    deckChosen: boolean,
    wheelChosen: boolean,
    truckChosen: boolean
  ) => ComputedPrices;
};

const defaultPrices: PriceMap = {
  deck: { blind: 90, girl: 100, supreme: 120 },
  trucks: { raw: 55, black: 65, gold: 85 },
  wheels: { classic: 20, conical: 24, wide: 30 },
};

const PriceContext = createContext<PriceContextValue | undefined>(undefined);

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPricesState] = useState<PriceMap>(defaultPrices);

  const setPrices = (p: Partial<PriceMap>) => {
    setPricesState((prev) => ({ ...prev, ...p }));
  };

  const format = (n: number) => `€${n.toFixed(2)}`;

  const computePrices = (
    deckGraphic: DeckGraphic,
    wheelType: WheelType,
    truckColor: TruckColor,
    deckChosen: boolean,
    wheelChosen: boolean,
    truckChosen: boolean
  ): ComputedPrices => {
    const deckPrice = deckChosen ? prices.deck[deckGraphic] : 0;
    const trucksPrice = truckChosen ? prices.trucks[truckColor] : 0;
    const wheelsPrice = wheelChosen ? prices.wheels[wheelType] : 0;
    const total = deckPrice + trucksPrice + wheelsPrice;

    return { deckPrice, trucksPrice, wheelsPrice, total, format };
  };

  const value = useMemo(() => ({ prices, setPrices, computePrices }), [prices]);

  return (
    <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
  );
};

export const usePriceStore = () => {
  const ctx = useContext(PriceContext);
  if (!ctx)
    throw new Error("usePriceStore must be used within a PriceProvider");
  return ctx;
};

export type { DeckGraphic, WheelType, TruckColor };
