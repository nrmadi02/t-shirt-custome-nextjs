"use client";

import TShirtExp from "./components/t-shirt.exp";
import { Canvas } from "@react-three/fiber";

const ThreeDRenderContainer = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10] }} className="!h-screen">
      <TShirtExp />
    </Canvas>
  );
};

export default ThreeDRenderContainer;
