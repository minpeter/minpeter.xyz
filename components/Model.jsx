import React, { useRef } from "react";

import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";

import { useFrame, useThree } from "@react-three/fiber";
// import { useControls } from "leva";

export default function Model() {
  const { nodes } = useGLTF("/Lickitung.gltf");

  const { viewport } = useThree();

  const torus = useRef(null);

  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },

  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },

  //   ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

  //   chromaticAberration: { value: 0.02, min: 0, max: 1 },

  //   backside: { value: true },
  // });

  const materialProps = {
    thickness: 1.1,
    roughness: 0.4,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.7,
    backside: true,
  };

  useFrame(() => {
    torus.current.rotation.z += 0.015;
  });

  return (
    <group scale={viewport.width / 20}>
      <Text
        position={[0, 0, -1]}
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {"VUD ❤️\n\n"}
        {"flag{1ICK17un6_poKemoN_1o8-2}"}
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
