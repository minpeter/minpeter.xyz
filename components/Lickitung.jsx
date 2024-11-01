"use client";

import React, { useRef } from "react";

import {
  Environment,
  MeshTransmissionMaterial,
  useGLTF,
  Text,
} from "@react-three/drei";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

export default function Lickitung() {
  return (
    <div className="w-full flex justify-center">
      <Canvas
        style={{ background: "0 0% 3.9%", height: "200px", width: "300px" }}
        camera={{ fov: 1 }}
      >
        <Model />

        <directionalLight intensity={2} position={[0, 2, 3]} />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

export function Model() {
  const { nodes } = useGLTF("/Lickitung.gltf");

  const { viewport } = useThree();

  const torus = useRef(null);

  const materialProps = {
    thickness: 1.1,
    roughness: 0.4,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.7,
    backside: true,
  };

  useFrame(() => {
    torus.current.rotation.z += 0.02;
  });

  return (
    <group scale={viewport.width / 20}>
      <Text
        position={[0, 0, -20]}
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {"VUD ❤️\n\nflag{1ICK17un6_poKemoN_1o8-2}"}
      </Text>

      <mesh
        ref={torus}
        geometry={nodes.mesh_0.geometry}
        position={[0, -6, 0]}
        rotation={[-Math.PI / -2, 0, 0]}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
