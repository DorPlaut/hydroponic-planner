import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { angleToRadians } from '../../utils/utils';
import * as THREE from 'three';
import BackgroundBoard from './BackgroundBoard';
import { Plant1 } from './plants/Plant1';
import { Plant2 } from './plants/Plant2';

// Constants for visual clarity
const RESERVOIR_COLOR = '#0000ff';
const TUBE_COLOR = '#ffffff';
const TUBE_CAP_COLOR = '#cccccc';
const ELBOW_COLOR = '#dddddd';
const CONNECTOR_COLOR = '#bbbbbb';

// PART COMPONENTS

// PVC tube
function Tube({
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
function TubeCap({
  position,
  rotation,
  radius,
  color = TUBE_CAP_COLOR,
  blueprintMode,
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
    </mesh>
  );
}

// PVC 90deg elbow
function Elbow({
  position,
  rotation,
  radius,
  color = ELBOW_COLOR,
  blueprintMode,
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
    </group>
  );
}

// PVC tube connector
function TubeConnector({
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
function TubeStrap({ position, rotation, radius, color = CONNECTOR_COLOR }) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius + 0.02, radius + 0.02, 0.03, 32]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

// Pipe

// Reservoir
function Reservoir({ position, size, color = RESERVOIR_COLOR }) {
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

// MAIN HYDROPONIC SYSTEM MODEL

function HydroponicSystemModel({
  params,
  flipped,
  showBackgroundBoard,
  showWallStand,
  blueprintMode,
  showPlants,
}) {
  const flipMultiplier = flipped ? -1 : 1;
  const { width, height, numTubes, holesPerTube, holeSize, tubeRadius, slope } =
    params;

  // Adjusted values
  const adjustedWidth = width * 0.01;
  const adjustedHeight = height * 0.01;
  const adjustedTubeRadius = (tubeRadius * 0.01) / 2;
  const adjustedHoleSize = holeSize * 0.01;
  const adjustedSlope = angleToRadians(((360 / 100) * slope) / 4);
  // Calculate reservoir size based on the number of plants
  const reservoirSize = useMemo(() => {
    return Math.max(20, numTubes * holesPerTube * 2); // Minimum 20L, 2L per plant
  }, [numTubes, holesPerTube]);

  // Calculate dimensions
  const tubeSpacing = adjustedHeight / (numTubes + 1);
  const tubeLength = adjustedWidth - adjustedTubeRadius * 8;

  // Calculate reservoir height and position
  const reservoirHeight = reservoirSize / 100;
  const reservoirBottomY = -adjustedHeight / 2 - reservoirHeight + 0.1;

  // Render system components
  return (
    <>
      <group
        scale={[flipMultiplier, 1, 1]}
        position={[
          flipped ? -adjustedTubeRadius * 1.5 : adjustedTubeRadius / 2,
          adjustedHeight / 10,
          0,
        ]}
      >
        {/* Main growing tubes */}
        {Array.from({ length: numTubes }).map((_, i) => {
          const isIndexEven = i % 2 === 0;
          const isFirstTube = i === numTubes - 1;
          return (
            <group
              key={i}
              position={[0, (i + 1) * tubeSpacing - adjustedHeight / 2, 0]}
            >
              {/* Main horizontal tube */}
              <Tube
                position={[0, 0, 0]}
                rotation={[
                  blueprintMode ? angleToRadians(90) : 0,
                  blueprintMode
                    ? isIndexEven
                      ? adjustedSlope
                      : -adjustedSlope
                    : 0,
                  !blueprintMode
                    ? isIndexEven
                      ? angleToRadians(90) + adjustedSlope
                      : angleToRadians(90) - adjustedSlope
                    : angleToRadians(90),
                ]}
                args={[adjustedTubeRadius, adjustedTubeRadius, tubeLength, 32]}
                blueprintMode={blueprintMode}
              >
                {/* wall stand */}
                {showWallStand && !blueprintMode && (
                  <>
                    <TubeStrap
                      position={[0, tubeLength / 2 - adjustedTubeRadius, 0]}
                      rotation={[0, 0, 0]}
                      radius={adjustedTubeRadius}
                    />
                    <TubeStrap
                      position={[0, -tubeLength / 2 + adjustedTubeRadius, 0]}
                      rotation={[0, 0, 0]}
                      radius={adjustedTubeRadius}
                    />
                  </>
                )}
              </Tube>

              {/* Tube connections and end caps */}
              {isFirstTube ? (
                isIndexEven ? (
                  <>
                    {/* End cap for even-indexed first tube */}
                    <TubeCap
                      position={[tubeLength / 2 + 0.01, adjustedSlope / 3.5, 0]}
                      rotation={[
                        blueprintMode ? angleToRadians(90) : 0,
                        0,
                        angleToRadians(90) + adjustedSlope,
                      ]}
                      radius={adjustedTubeRadius}
                      blueprintMode={blueprintMode}
                    />
                    {/* Elbow and vertical tube for even-indexed first tube */}
                    <Elbow
                      position={[
                        -tubeLength / 2 - adjustedTubeRadius,
                        -adjustedTubeRadius - adjustedSlope / 3,
                        0,
                      ]}
                      rotation={[0, 0, 0]}
                      radius={adjustedTubeRadius}
                      blueprintMode={blueprintMode}
                    />
                    <Tube
                      position={[
                        -tubeLength / 2 - adjustedTubeRadius * 2,
                        -tubeSpacing / 2,
                        0,
                      ]}
                      rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
                      args={[
                        adjustedTubeRadius,
                        adjustedTubeRadius,
                        tubeSpacing - adjustedTubeRadius * 4,
                        32,
                      ]}
                      blueprintMode={blueprintMode}
                    />
                  </>
                ) : (
                  <>
                    {/* End cap for odd-indexed first tube */}
                    <TubeCap
                      position={[
                        -tubeLength / 2 - 0.01,
                        adjustedSlope / 3.5,
                        0,
                      ]}
                      rotation={[
                        blueprintMode ? angleToRadians(90) : 0,
                        0,
                        angleToRadians(90) - adjustedSlope,
                      ]}
                      radius={adjustedTubeRadius}
                      blueprintMode={blueprintMode}
                    />
                    {/* Elbow and vertical tube for odd-indexed first tube */}
                    <Elbow
                      position={[
                        tubeLength / 2 + adjustedTubeRadius,
                        -adjustedTubeRadius - adjustedSlope / 3,
                        0,
                      ]}
                      rotation={[0, angleToRadians(180), angleToRadians(0)]}
                      radius={adjustedTubeRadius}
                      blueprintMode={blueprintMode}
                    />
                    <Tube
                      position={[
                        tubeLength / 2 + adjustedTubeRadius * 2,
                        -tubeSpacing / 2,
                        0,
                      ]}
                      rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
                      args={[
                        adjustedTubeRadius,
                        adjustedTubeRadius,
                        tubeSpacing - adjustedTubeRadius * 4,
                        32,
                      ]}
                      blueprintMode={blueprintMode}
                    />
                  </>
                )
              ) : isIndexEven ? (
                <>
                  {/* Connections for even-indexed tubes */}
                  <Elbow
                    position={[
                      -tubeLength / 2 - adjustedTubeRadius,
                      -adjustedTubeRadius - adjustedSlope / 3,
                      0,
                    ]}
                    rotation={[0, 0, angleToRadians(0)]}
                    radius={adjustedTubeRadius}
                    blueprintMode={blueprintMode}
                  />
                  <Tube
                    position={[
                      -tubeLength / 2 - adjustedTubeRadius * 2,
                      -tubeSpacing / 2,
                      0,
                    ]}
                    rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
                    args={[
                      adjustedTubeRadius,
                      adjustedTubeRadius,
                      tubeSpacing - adjustedTubeRadius * 4,
                      32,
                    ]}
                    blueprintMode={blueprintMode}
                  />
                  <Elbow
                    position={[
                      tubeLength / 2,
                      adjustedTubeRadius * 2 + adjustedSlope / 3,
                      0,
                    ]}
                    rotation={[0, angleToRadians(180), angleToRadians(90)]}
                    radius={adjustedTubeRadius}
                    blueprintMode={blueprintMode}
                  />
                </>
              ) : (
                <>
                  {/* Connections for odd-indexed tubes */}
                  <Elbow
                    position={[
                      -tubeLength / 2,
                      adjustedTubeRadius * 2 + adjustedSlope / 3,
                      0,
                    ]}
                    rotation={[0, 0, angleToRadians(90)]}
                    radius={adjustedTubeRadius}
                    blueprintMode={blueprintMode}
                  />
                  <Tube
                    position={[
                      tubeLength / 2 + adjustedTubeRadius * 2,
                      -tubeSpacing / 2,
                      0,
                    ]}
                    rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
                    args={[
                      adjustedTubeRadius,
                      adjustedTubeRadius,
                      tubeSpacing - adjustedTubeRadius * 4,
                      32,
                    ]}
                    blueprintMode={blueprintMode}
                  ></Tube>

                  {/*  */}
                  <Elbow
                    position={[
                      tubeLength / 2 + adjustedTubeRadius,
                      -adjustedTubeRadius - adjustedSlope / 3,
                      0,
                    ]}
                    rotation={[0, angleToRadians(180), 0]}
                    radius={adjustedTubeRadius}
                    blueprintMode={blueprintMode}
                  />
                </>
              )}

              {/* Holes for plants */}
              <group
                rotation={[
                  angleToRadians(20),
                  0,
                  isIndexEven ? +adjustedSlope / 1.05 : -adjustedSlope / 1.05,
                ]}
              >
                {Array.from({ length: holesPerTube }).map((_, j) => (
                  <mesh
                    key={j}
                    position={[
                      (j + 1) * (tubeLength / (holesPerTube + 1)) -
                        tubeLength / 2,
                      adjustedTubeRadius,
                      0,
                    ]}
                    rotation={[angleToRadians(-90), 0, 0]}
                  >
                    <circleGeometry args={[adjustedHoleSize / 2, 32]} />
                    <meshBasicMaterial color="#000000" />
                    {showPlants &&
                      !blueprintMode &&
                      (j % 2 === 0 ? (
                        isIndexEven ? (
                          <Plant1
                            position={[0, 0, -holeSize / 50]}
                            scale={holeSize / 5}
                          />
                        ) : (
                          <Plant2
                            position={[0, 0, -holeSize / 50]}
                            scale={holeSize / 5}
                          />
                        )
                      ) : isIndexEven ? (
                        <Plant2
                          position={[0, 0, -holeSize / 50]}
                          rotation={[0, 0, angleToRadians(Math.random * 180)]}
                          scale={holeSize / 5}
                        />
                      ) : (
                        <Plant1
                          position={[0, 0, -holeSize / 50]}
                          scale={holeSize / 5}
                        />
                      ))}
                  </mesh>
                ))}
              </group>
            </group>
          );
        })}

        {/* Reservoir */}
        {blueprintMode || (
          <Reservoir
            position={[
              -tubeLength / 2 - adjustedTubeRadius * 3,

              -adjustedHeight / 2 - reservoirHeight / 2 + 0.1,
              adjustedTubeRadius * 1.5,
            ]}
            size={[adjustedTubeRadius, reservoirHeight, adjustedHeight / 2]}
          />
        )}

        {/* Pump tube from reservoir to top elbow connecting back to the system */}
        <Tube
          position={[
            -adjustedWidth / 2 - adjustedTubeRadius / 2 - 0.01,
            (reservoirBottomY +
              adjustedHeight / 2 +
              reservoirHeight / 100 -
              tubeSpacing +
              adjustedTubeRadius * 2) /
              2,
            0,
          ]}
          rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
          args={[
            adjustedTubeRadius / 2,
            adjustedTubeRadius / 2,
            adjustedHeight +
              reservoirHeight -
              tubeSpacing +
              adjustedTubeRadius -
              0.02,
            32,
          ]}
          blueprintMode={blueprintMode}
        />
        <Elbow
          position={[
            -adjustedWidth / 2 - 0.01,
            adjustedHeight / 2 +
              reservoirHeight / 100 -
              tubeSpacing +
              adjustedTubeRadius * 2.25,
            0,
          ]}
          rotation={[0, 0, 0]}
          radius={adjustedTubeRadius / 2}
          blueprintMode={blueprintMode}
        />
        {/* connect back to system */}
        {numTubes % 2 === 0 ? (
          // to the right
          <>
            <Tube
              position={[
                -adjustedWidth / 2 + adjustedTubeRadius * 2,
                adjustedHeight / 2 +
                  reservoirHeight / 100 -
                  tubeSpacing +
                  adjustedTubeRadius * 2.75,
                0,
              ]}
              rotation={[
                blueprintMode ? angleToRadians(90) : 0,
                0,
                angleToRadians(90),
              ]}
              args={[
                adjustedTubeRadius / 2,
                adjustedTubeRadius / 2,
                (adjustedWidth - tubeLength) / 2,
                32,
              ]}
              blueprintMode={blueprintMode}
            />
            <Elbow
              position={[
                -tubeLength / 2 + 0.01,
                adjustedHeight / 2 +
                  reservoirHeight / 100 -
                  tubeSpacing +
                  adjustedTubeRadius * 2.25,
                0,
              ]}
              rotation={[0, angleToRadians(180), 0]}
              radius={adjustedTubeRadius / 2}
              blueprintMode={blueprintMode}
            />
            <Tube
              position={[
                -tubeLength / 2 + adjustedTubeRadius / 2 + 0.01,
                adjustedHeight / 2 +
                  reservoirHeight / 100 -
                  tubeSpacing +
                  adjustedTubeRadius * 1.25,
                0,
              ]}
              rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
              args={[
                adjustedTubeRadius / 2,
                adjustedTubeRadius / 2,
                adjustedTubeRadius * 1.25,
                32,
              ]}
              blueprintMode={blueprintMode}
            />
          </>
        ) : (
          // to the left
          <>
            <Tube
              position={[
                -adjustedTubeRadius * 2.5 - 0.01,
                adjustedHeight / 2 +
                  reservoirHeight / 100 -
                  tubeSpacing +
                  adjustedTubeRadius * 2.75,
                0,
              ]}
              rotation={[
                blueprintMode ? angleToRadians(90) : 0,
                0,
                angleToRadians(90),
              ]}
              args={[
                adjustedTubeRadius / 2,
                adjustedTubeRadius / 2,
                (adjustedWidth + tubeLength - adjustedTubeRadius * 2) / 2.05,
                32,
              ]}
              blueprintMode={blueprintMode}
            />
            <Elbow
              position={[
                tubeLength / 2 - adjustedTubeRadius - 0.01,
                height / 200 +
                  reservoirHeight / 100 -
                  tubeSpacing +
                  adjustedTubeRadius * 2.25,
                0,
              ]}
              rotation={[0, angleToRadians(180), 0]}
              radius={adjustedTubeRadius / 2}
              blueprintMode={blueprintMode}
            />
            <Tube
              position={[
                tubeLength / 2 - adjustedTubeRadius / 2 - 0.01,

                height / 200 +
                  reservoirHeight / 100 -
                  tubeSpacing +
                  adjustedTubeRadius * 1.25,
                0,
              ]}
              rotation={[0, blueprintMode ? angleToRadians(90) : 0, 0]}
              args={[
                adjustedTubeRadius / 2,
                adjustedTubeRadius / 2,
                adjustedTubeRadius * 1.25,
                32,
              ]}
              blueprintMode={blueprintMode}
            />
          </>
        )}
        {/* wall stand */}
        {showWallStand && !blueprintMode && (
          <>
            <mesh
              position={[
                tubeLength / 2 - adjustedTubeRadius,
                0,
                -adjustedTubeRadius - 0.02,
              ]}
            >
              <boxGeometry args={[0.05, adjustedHeight - tubeSpacing, 0.025]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh
              position={[
                -tubeLength / 2 + adjustedTubeRadius,
                0,
                -adjustedTubeRadius - 0.02,
              ]}
            >
              <boxGeometry args={[0.05, adjustedHeight - tubeSpacing, 0.025]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </>
        )}
      </group>
      {/* Background Board */}
      <BackgroundBoard
        width={adjustedWidth}
        height={adjustedHeight}
        visible={blueprintMode ? true : showBackgroundBoard}
        zOffset={blueprintMode ? 0.01 : adjustedTubeRadius * 1.5}
        yOffset={reservoirHeight / 1.5 - adjustedHeight / 10}
        xOffset={adjustedTubeRadius / 2}
      />
    </>
  );
}

// CAMERA control
function CustomOrbitControls({ blueprintMode }) {
  const controlsRef = useRef();
  useEffect(() => {
    if (controlsRef.current) {
      if (blueprintMode) {
        controlsRef.current.enableRotate = false;
        controlsRef.current.reset();

        controlsRef.current.mouseButtons = {
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.PAN,
        };
      } else {
        controlsRef.current.reset();
        controlsRef.current.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        };
        // Reset to default OrbitControls behavior
        controlsRef.current.enableRotate = true;
      }
    }
  }, [blueprintMode]);

  return <OrbitControls ref={controlsRef} />;
}

// MAIN HYDROPONIC SYSTEM COMPONENT

export default function HydroponicSystem({
  params,
  flipped,
  showBackgroundBoard,
  showWallStand,
  blueprintMode,
  showPlants,
}) {
  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      if (blueprintMode) {
        // Reset camera position and rotation
        cameraRef.current.position.set(0, 0, 3);
        cameraRef.current.rotation.set(0, 0, 0);
        cameraRef.current.updateProjectionMatrix();
      }
    }
  }, [blueprintMode]);
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} ref={cameraRef} />
      <ambientLight intensity={0.5} />
      {blueprintMode || (
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
      )}

      <HydroponicSystemModel
        params={params}
        flipped={flipped}
        showBackgroundBoard={showBackgroundBoard}
        showWallStand={showWallStand}
        blueprintMode={blueprintMode}
        showPlants={showPlants}
      />

      <CustomOrbitControls blueprintMode={blueprintMode} />
    </Canvas>
  );
}
