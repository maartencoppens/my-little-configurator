import { Html } from "@react-three/drei";

export const LoadingSpinner = () => {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-black/90" />
      </div>
    </Html>
  );
};
