import React, { useRef } from "react";

import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";

import { useControls } from "leva";

import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  // const { nodes, materials } = useGLTF("/Lickitung.glb");
  const { nodes, materials } = useGLTF("/Lickitung.gltf");

  const { viewport } = useThree();

  const materialProps = useControls({
    thickness: { value: 3, min: 0, max: 3, step: 0.05 },

    roughness: { value: 1, min: 0, max: 1, step: 0.1 },

    transmission: { value: 1, min: 0, max: 1, step: 0.1 },

    ior: { value: 3, min: 0, max: 3, step: 0.1 },

    chromaticAberration: { value: 1, min: 0, max: 1 },

    backside: { value: true },
  });

  const torus1 = useRef(null);

  useFrame(() => {
    torus1.current.rotation.z += 0.01;
  });

  return (
    <group scale={viewport.width / 150} dispose={null}>
      <Text
        position={[0, 0, -1]}
        fontSize={20}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        내루미 ❤️
      </Text>

      <mesh
        ref={torus1}
        geometry={nodes.mesh_0.geometry}
        position={[0, -6, 0]}
        rotation={[-Math.PI / -2, 0, 0]}
      >
        <meshBasicMaterial color="rgb(255, 255, 255)" />
        <MeshTransmissionMaterial
          color="rgb(255, 255, 255)"
          {...materialProps}
        />
      </mesh>
    </group>
  );
}
