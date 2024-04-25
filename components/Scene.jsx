"use client";

import { Canvas } from "@react-three/fiber";

import Model from "./Model";

import { Environment, OrbitControls } from "@react-three/drei";

export default function Index() {
  return (
    <div className="w-full flex justify-center">
      <Canvas
        style={{ background: "0 0% 3.9%", height: "200px", width: "300px" }}
        // camera={{ fov: 1, near: 0.1, far: 500, position: [0, 0, 400] }}
        camera={{ fov: 1 }}
      >
        <Model />

        <directionalLight intensity={2} position={[0, 2, 3]} />

        <Environment preset="studio" />
        {/* <OrbitControls makeDefault /> */}
      </Canvas>
    </div>
  );
}
