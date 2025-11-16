import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Skateboard from "../three/Skateboard";
import ConfigSidebar from "../components/Sidebar/ConfigSidebar";

type Part = "deck" | "trucks" | "wheels" | null;
type DeckGraphic = "flame" | "minimal" | "galaxy";
type WheelType = "classic" | "conical" | "wide";
type TruckColor = "raw" | "black" | "gold";

const Configurator = () => {
  const [selectedPart, setSelectedPart] = useState<Part>(null);
  const [deckGraphic, setDeckGraphic] = useState<DeckGraphic>("flame");
  const [wheelType, setWheelType] = useState<WheelType>("classic");
  const [truckColor, setTruckColor] = useState<TruckColor>("raw");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-col items-stretch justify-center flex-1 lg:h-screen">
        <div className="relative mx-auto w-full max-w-[1800px] h-[80svh] px-4 md:px-8">
          {selectedPart && (
            <>
              <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20">
                <ConfigSidebar
                  selectedPart={selectedPart}
                  deckGraphic={deckGraphic}
                  setDeckGraphic={setDeckGraphic}
                  wheelType={wheelType}
                  setWheelType={setWheelType}
                  truckColor={truckColor}
                  setTruckColor={setTruckColor}
                />
              </div>

              <div className="md:hidden absolute inset-x-0 bottom-0 z-20">
                <ConfigSidebar
                  selectedPart={selectedPart}
                  deckGraphic={deckGraphic}
                  setDeckGraphic={setDeckGraphic}
                  wheelType={wheelType}
                  setWheelType={setWheelType}
                  truckColor={truckColor}
                  setTruckColor={setTruckColor}
                />
              </div>
            </>
          )}

          {selectedPart !== null && (
            <button
              onClick={() => setSelectedPart(null)}
              className="
                absolute top-4 right-4 z-30
                px-4 py-2
                bg-black/60 backdrop-blur-md
                text-white font-semibold
                rounded-lg border border-white/30
                hover:bg-black/70 transition-all fade-in
              "
            >
              ← Back
            </button>
          )}

          <Canvas
            className="w-full h-full rounded-xl overflow-hidden"
            camera={{ position: [0, 0.7, 2.3], fov: 28 }}
          >
            <Suspense fallback={null}>
              <OrbitControls enablePan={false} />
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Skateboard
                selectedPart={selectedPart}
                setSelectedPart={setSelectedPart}
                deckGraphic={deckGraphic}
                wheelType={wheelType}
                truckColor={truckColor}
              />
            </Suspense>
          </Canvas>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configurator;
