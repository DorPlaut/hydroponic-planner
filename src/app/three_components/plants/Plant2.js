import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { angleToRadians } from '@/utils/utils';

export function Plant2(props) {
  const { nodes, materials } = useGLTF('/models/Houseplant_2.glb');
  // Make the material double-sided
  //   materials.Plant_Green.side = THREE.DoubleSide;
  return (
    <group {...props} dispose={null}>
      <group rotation={[angleToRadians(90), 0, 0]} scale={0.0017}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['plant_01_Cube006-Mesh_1'].geometry}
          material={materials['8BC34A']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/Houseplant_2.glb');
