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
            display: "block",
          }}
          camera={{ fov: 1 }}
          dpr={[0.7, 1.5]} // 디바이스 픽셀 비율 하향 조정
          performance={{ min: 0.5 }} // 최소 성능 임계값 증가
          gl={{
            powerPreference: "high-performance",
            antialias: false, // 안티앨리어싱 비활성화
          }}
        >
          <Suspense fallback={null}>
            <Model />
            {/* 주 광원 - 자연광처럼 넓은 각도로 비춤 */}
            <spotLight
              position={[2, 8, 4]}
              angle={0.7}
              penumbra={1}
              intensity={15}
              distance={30}
              target-position={[0, -6, 0]}
            />
            {/* 보조 광원 - 반대편에서 부드럽게 비춤 */}
            <spotLight
              position={[-3, 4, -2]}
              angle={0.9}
              penumbra={1}
              intensity={8}
              distance={20}
              target-position={[0, -6, 0]}
            />
            {/* 환경광 - 자연스러운 주변 조명 */}
            <hemisphereLight
              intensity={5}
              groundColor="#1a1a1a"
              color="#ffffff"
            />
            {/* 은은한 앰비언트 라이트 */}
            <ambientLight intensity={2} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export function Model() {
  const { nodes } = useGLTF("/Lickitung.gltf", true); // draco 압축 활성화

  const { viewport } = useThree();

  const torus = useRef(null);

  const materialProps = {
    thickness: 1.1,
    roughness: 0.25,
    transmission: 1,
    ior: 1.4,
    chromaticAberration: 0.6,
    backside: true,
    clearcoat: 0.4,
    clearcoatRoughness: 0.1,
    emissiveIntensity: 0.05,
    attenuationDistance: 0.5,
    attenuationColor: "#ffffff",
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
        opacity={0.7} // 텍스트 투명도 조정
      >
        {"VUD ❤️\n\nflag{1ICK17un6_1o8-2}\n\nNULL"}
      </Text>

      <mesh
        ref={torus}
        // @ts-ignore
        geometry={nodes.mesh_0.geometry}
        position={[0, -6, 0]}
        rotation={[-Math.PI / -2, 0, 0]}
        frustumCulled={true} // 시야 밖 렌더링 방지
        castShadow={false} // 그림자 비활성화
        receiveShadow={false}
      >
        <MeshTransmissionMaterial
          {...materialProps}
          emissiveIntensity={0.2} // 약간의 자체 발광 추가
          clearcoat={0.1} // 광택 추가
        />
      </mesh>
    </group>
  );
}
