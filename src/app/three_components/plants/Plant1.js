import React, { useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Plant1(props) {
  const { nodes, materials } = useGLTF('models/Houseplant.glb');
  // Make the material double-sided
  materials.Plant_Green.side = THREE.DoubleSide;
  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, 0]} scale={30}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_7_3.geometry}
          material={materials.Plant_Green}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/Houseplant.glb');
