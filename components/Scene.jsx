"use client";

import { Canvas } from "@react-three/fiber";

import Model from "./Model";

import { Environment } from "@react-three/drei";

export default function Index() {
  return (
    <Canvas style={{ background: "0 0% 3.9%" }}>
      {/* // <Canvas style={{ background: "#ffffff" }}> */}
      <Model />
    </Canvas>
  );
}
