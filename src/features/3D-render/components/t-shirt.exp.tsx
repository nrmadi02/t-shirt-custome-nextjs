'use client'

import { Environment, OrbitControls } from "@react-three/drei"
import TShirtView from "./t-shirt.view"
import { Suspense } from "react";
import { AmbientLight } from "three";

const TShirtExp = () => {
  return (
    <>
      <OrbitControls autoRotate={false} />
      <ambientLight intensity={0.5} />
      <Suspense>
        <TShirtView />
      </Suspense>
      <Environment preset="city" />
    </>
  );
}

export default TShirtExp