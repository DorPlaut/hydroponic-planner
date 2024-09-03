import { angleToRadians } from '@/utils/utils';
import * as THREE from 'three';

// Constants for visual clarity
const RESERVOIR_COLOR = '#0000ff';
const TUBE_COLOR = '#ffffff';
const TUBE_CAP_COLOR = '#cccccc';
const ELBOW_COLOR = '#dddddd';
const CONNECTOR_COLOR = '#bbbbbb';

// PART COMPONENTS

// PVC tube
export function Tube({
  position,
  rotation,
  args,
  color = TUBE_COLOR,
  children,
  blueprintMode,
}) {
  args[2] = args[2] + 0.02;
  args[3] = blueprintMode ? 2 : 32;
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={args} />
      <meshPhongMaterial
        color={blueprintMode ? 'black' : color}
        wireframe={blueprintMode}
      />
      {children}
    </mesh>
  );
}

// PVC tube cap
export function TubeCap({
  position,
  rotation,
  radius,
  color = TUBE_CAP_COLOR,
  blueprintMode,
  children,
}) {
  const expandedRadius = radius * 1.1;
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry
        args={[
          expandedRadius,
          expandedRadius,
          expandedRadius * 0.2,
          blueprintMode ? 2 : 32,
        ]}
      />
      <meshPhongMaterial
        color={blueprintMode ? 'black' : color}
        wireframe={blueprintMode}
      />
      {children}
    </mesh>
  );
}

// PVC 90deg elbow
export function Elbow({
  position,
  rotation,
  radius,
  color = ELBOW_COLOR,
  blueprintMode,
  children,
}) {
  return (
    <group
      position={[position[0], position[1] - radius, position[2]]}
      rotation={rotation}
    >
      <mesh position={[radius, 0, 0]} rotation={[0, 0, angleToRadians(90)]}>
        <torusGeometry
          args={[
            radius * 2,
            radius * 1.1,
            blueprintMode ? 2 : 16,
            blueprintMode ? 4 : 16,
            angleToRadians(90),
          ]}
        />
        <meshPhongMaterial
          color={blueprintMode ? 'black' : color}
          side={THREE.DoubleSide}
          wireframe={blueprintMode}
        />
      </mesh>
      {children}
    </group>
  );
}

// PVC tube connector
export function TubeConnector({
  position,
  rotation,
  radius,
  length,
  color = CONNECTOR_COLOR,
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius * 1.1, radius * 1.1, length, 32]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

// Pipe strap
export function TubeStrap({
  position,
  rotation,
  radius,
  color = CONNECTOR_COLOR,
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius + 0.02, radius + 0.02, 0.03, 32]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

// Reservoir
export function Reservoir({ position, size, color = RESERVOIR_COLOR }) {
  const reservoirRadius = size[0] * 3;
  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <cylinderGeometry
        args={[reservoirRadius, reservoirRadius, size[1], 32]}
      />
      <meshPhongMaterial color={TUBE_COLOR} transparent opacity={0.5} />
      <mesh position={[0, -0.01, 0]}>
        <cylinderGeometry
          args={[
            reservoirRadius - 0.01,
            reservoirRadius - 0.01,
            size[1] - 0.03,
            32,
          ]}
        />
        <meshPhongMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <TubeCap
        position={[0, size[1] / 2, 0]}
        rotation={[0, 0, 0]}
        radius={reservoirRadius}
        color={TUBE_CAP_COLOR}
      />
    </mesh>
  );
}
