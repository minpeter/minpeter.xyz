"use client";

import React, { useRef, Suspense } from "react";
import {
  Environment,
  MeshTransmissionMaterial,
  useGLTF,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// GLTF 로더에 draco 압축 옵션 추가
useGLTF.preload("/Lickitung.gltf", true);

export default function Lickitung() {
  return (
    <div className="w-full flex justify-center">
      <Canvas
        style={{ background: "0 0% 3.9%", height: "200px", width: "300px" }}
        camera={{ fov: 1 }}
        dpr={[1, 2]} // 디바이스 픽셀 비율 최적화
        performance={{ min: 0.1 }} // 성능 최적화
      >
        <Suspense fallback={null}>
          <Model />
          <directionalLight intensity={2} position={[0, 2, 3]} />
          <Environment preset="studio" />
        </Suspense>
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
        {"VUD ❤️\n\nflag{1ICK17un6_1o8-2}\n\nNULL"}
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
