"use client";

import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import { Euler, Mesh, Vector3 } from "three";
import { easing } from "maath";

const TShirtView = () => {
  const { nodes, materials } = useGLTF("/models/shirt_baked.glb", true);
  const mesh = useRef<Mesh>(null!);
  const meshDecal = useRef<Mesh>(null!);

  useControls({
    color: {
      value: "#ffffff",
      onChange: (value) => {
        setColor(() => value);
      },
    },
    image: {
      image: "/textures/away-logo.png",
      onChange: (value) => {
        setImage(() => value);
      },
    },
    angleX: {
      min: -3,
      max: 3,
      value: 0.1,
      step: 0.01,
      onChange: (value) => {
        setRotation((rot) => new Euler(value, rot.y, rot.z));
      },
    },
    angleY: {
      min: -3,
      max: 3,
      value: 0.1,
      step: 0.01,
      onChange: (value) => {
        setRotation((rot) => new Euler(rot.x, value, rot.z));
      },
    },
    angleZ: {
      min: -3,
      max: 3,
      value: 0.02,
      step: 0.01,
      onChange: (value) => {
        setRotation((rot) => new Euler(rot.x, rot.y, value));
      },
    },
    posX: {
      min: -3,
      max: 3,
      value: 0.01,
      step: 0.01,
      onChange: (value) => {
        setPos((pos) => new Vector3(value, pos.y, pos.z));
      },
    },
    posY: {
      min: -3,
      max: 3,
      value: 0.04,
      step: 0.01,
      onChange: (value) => {
        setPos((pos) => new Vector3(pos.x, value, pos.z));
      },
    },
    posZ: {
      min: -3,
      max: 3,
      value: 0.15,
      step: 0.01,
      onChange: (value) => {
        setPos((pos) => new Vector3(pos.x, pos.y, value));
      },
    },
    scale: {
      min: 0.1,
      max: 3,
      value: 0.1,
      step: 0.01,
      onChange: (value) => {
        setScale(() => value);
      },
    },
  });

  const [pos, setPos] = useState<Vector3>(new Vector3(0.01, 0.04, 0.15));
  const [rotation, setRotation] = useState<Euler & (number | Euler)>(
    new Euler(0.1, 0.1, 0.02)
  );
  const [scale, setScale] = useState(0.1);
  const [color, setColor] = useState("#ff0000");
  const [image, setImage] = useState<string>("/textures/away-logo.png");
   const texture = useTexture(image ?? "textures/away-logo.png");

  useFrame((state, delta) =>
    easing.dampC((materials.lambert1 as any).color, color, 0.25, delta)
  );

  return (
    <group>
      <mesh
        castShadow
        geometry={(nodes.T_Shirt_male as any).geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={10}
      >
        <Decal
          position={pos}
          rotation={rotation}
          scale={scale}
          map={texture}
          ref={meshDecal}
        />
      </mesh>
    </group>
  );
};


useGLTF.preload("/models/t-shirt.glb");

export default TShirtView;
