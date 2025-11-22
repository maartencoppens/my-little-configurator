import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Skateboard from "../three/Skateboard";
import ConfigSidebar from "../components/Sidebar/ConfigSidebar";
import * as THREE from "three";
import { PriceCard } from "../components/Sidebar/PriceCard";
import { PriceProvider } from "../stores/PriceStore";
import { LoadingSpinner } from "../components/Loadingspinner";

type Part = "deck" | "trucks" | "wheels" | null;
type DeckGraphic = "blind" | "girl" | "supreme";
type WheelType = "classic" | "conical" | "wide";
type TruckColor = "raw" | "black" | "gold";

const Configurator = () => {
  const [selectedPart, setSelectedPart] = useState<Part>(null);
  const [deckGraphic, setDeckGraphic] = useState<DeckGraphic>("blind");
  const [wheelType, setWheelType] = useState<WheelType>("classic");
  const [truckColor, setTruckColor] = useState<TruckColor>("raw");
  const [deckChosen, setDeckChosen] = useState<boolean>(true);
  const [wheelChosen, setWheelChosen] = useState<boolean>(true);
  const [truckChosen, setTruckChosen] = useState<boolean>(true);
  const controlsRef = useRef<any>(null);
  const cameraInitialPos = new THREE.Vector3(0, 0.7, 2.3);
  const targetInitial = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object as THREE.PerspectiveCamera;

    if (selectedPart) {
      controls.enabled = false;
      camera.position.copy(cameraInitialPos);
      controls.target.copy(targetInitial);
      controls.update();
      setTimeout(() => {
        controls.enabled = true;
      }, 800);
    }
  }, [selectedPart]);

  useEffect(() => {
    if (!deckChosen && !wheelChosen && !truckChosen) {
      setSelectedPart(null);
    }
  }, [deckChosen, wheelChosen, truckChosen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-stretch justify-center flex-1 lg:h-screen">
        <div className="relative mx-auto w-full max-w-[1800px] h-[80svh] px-4 lg:px-8 flex flex-col lg:flex-row-reverse lg:items-center gap-4">
          <PriceProvider>
            {/* Desktop */}
            <div className="hidden lg:flex lg:flex-col lg:w-80 lg:order-2 lg:gap-4">
              <ConfigSidebar
                selectedPart={selectedPart}
                deckGraphic={deckGraphic}
                setDeckGraphic={setDeckGraphic}
                wheelType={wheelType}
                setWheelType={setWheelType}
                truckColor={truckColor}
                setTruckColor={setTruckColor}
                setDeckChosen={setDeckChosen}
                setWheelChosen={setWheelChosen}
                setTruckChosen={setTruckChosen}
              />

              <div className="hidden lg:block">
                <PriceCard
                  deckGraphic={deckGraphic}
                  wheelType={wheelType}
                  truckColor={truckColor}
                  deckChosen={deckChosen}
                  wheelChosen={wheelChosen}
                  truckChosen={truckChosen}
                />
              </div>
            </div>
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

            {/* Canvas area */}
            <div className="flex-1 min-h-0 h-full min-w-0 order-1 lg:order-1">
              <Canvas
                className="w-full h-full rounded-xl overflow-hidden"
                camera={{ position: [0, 0.7, 2.3], fov: 28 }}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <OrbitControls enablePan={false} ref={controlsRef} />
                  <directionalLight position={[5, 5, 5]} intensity={1.6} />
                  <directionalLight position={[-3, 3, -2]} intensity={0.6} />
                  <ambientLight intensity={0.5} />
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
            <div className="max-w-[400px] mx-auto order-3">
              {/* Mobile */}
              <div className="lg:hidden w-full mt-4 order-2">
                <ConfigSidebar
                  selectedPart={selectedPart}
                  deckGraphic={deckGraphic}
                  setDeckGraphic={setDeckGraphic}
                  wheelType={wheelType}
                  setWheelType={setWheelType}
                  truckColor={truckColor}
                  setTruckColor={setTruckColor}
                  setDeckChosen={setDeckChosen}
                  setWheelChosen={setWheelChosen}
                  setTruckChosen={setTruckChosen}
                />
              </div>

              <div className="lg:hidden w-full mt-4 order-3">
                <PriceCard
                  deckGraphic={deckGraphic}
                  wheelType={wheelType}
                  truckColor={truckColor}
                  deckChosen={deckChosen}
                  wheelChosen={wheelChosen}
                  truckChosen={truckChosen}
                />
              </div>
            </div>
          </PriceProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Configurator;
