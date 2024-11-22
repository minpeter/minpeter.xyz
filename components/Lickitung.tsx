"use client";

import React, { useRef, Suspense } from "react";
import {
  Environment,
  MeshTransmissionMaterial,
  useGLTF,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

useGLTF.preload("/Lickitung.gltf", true);

const calculateAspectRatio = (ratio: string) => {
  const [width, height] = ratio.split("/").map(Number);
  return `${(height / width) * 100}%`;
};

export default function Lickitung({ aspect = "3/2" }) {
  return (
    <div
      className="w-full relative"
      style={{ paddingTop: calculateAspectRatio(aspect) }}
    >
      <div className="absolute inset-0">
        <Canvas
          style={{
            background: "0 0% 3.9%",
            width: "100%",
            height: "100%",
            display: "block", // Add this to remove extra space
          }}
          camera={{ fov: 1 }}
          dpr={[1, 2]} // 디바이스 픽셀 비율 최적화
          performance={{ min: 0.1 }} // 성능 최적화
        >
          <Suspense fallback={null}>
            <Model />
            <directionalLight intensity={20} position={[0, 2, 3]} />
            <ambientLight intensity={20} />
            <pointLight intensity={20} position={[0, 5, 5]} />
          </Suspense>
        </Canvas>
      </div>
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
    // @ts-ignore
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
        {"VUD ❤️\n\nflag{1ICK17un6_1o8-2}\n\nNULL"}
      </Text>

      <mesh
        ref={torus}
        // @ts-ignore
        geometry={nodes.mesh_0.geometry}
        position={[0, -6, 0]}
        rotation={[-Math.PI / -2, 0, 0]}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
