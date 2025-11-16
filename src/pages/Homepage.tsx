import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Deck from "../three/Deck";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col lg:flex-row items-center justify-center flex-1 gap-20 p-10 lg:h-screen">
        <div className="flex flex-col justify-center lg:gap-10">
          <div className="mb-14 text-center lg:text-left">
            <h1 className="text-7xl font-heading py-6">Design your Ride</h1>
            <p className="text-4xl font-bold text-text-secondary">
              Design your Ride
            </p>
          </div>
          <CTA />
        </div>
        <div className="w-full h-[50svh] lg:h-[80svh] lg:w-[600px]">
          <Canvas
            className="w-full h-full"
            camera={{ position: [0, 0, 2], fov: 50 }}
          >
            <Suspense fallback={null}>
              <OrbitControls enablePan={false} />
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Deck />
            </Suspense>
          </Canvas>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
