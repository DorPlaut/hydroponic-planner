import React, { useMemo } from 'react';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundBoard = ({
  width,
  height,
  visible,
  zOffset,
  yOffset,
  xOffset,
}) => {
  // Grid size in meters
  const gridSize = 0.1;

  // Create grid lines and labels
  const gridElements = useMemo(() => {
    const elements = [];

    // Helper function to create a line
    const createLine = (start, end, key) => (
      <Line key={key} points={[start, end]} color="#cccccc" lineWidth={1} />
    );

    // Helper function to create a label
    const createLabel = (position, text, anchorX) => (
      <Text
        key={`label-${position.join('-')}`}
        position={position}
        fontSize={0.03}
        color="black"
        anchorX={anchorX}
        anchorY="middle"
      >
        {text}
      </Text>
    );

    // Calculate the number of lines needed to cover the entire board
    const numLinesX = Math.ceil(width / gridSize) + 1;
    const numLinesY = Math.ceil(height / gridSize) + 1;

    // Create vertical lines and labels
    for (let i = 0; i < numLinesX; i++) {
      const x = i * gridSize - width / 2;
      elements.push(
        createLine(
          new THREE.Vector3(x, -height / 2, 0),
          new THREE.Vector3(x, height / 2, 0),
          `vertical-${i}`
        )
      );

      // Add labels at regular intervals (e.g., every 5 lines)
      if (i % 2 === 0) {
        elements.push(
          createLabel([x, -height / 2 - 0.05, 0], (i * 10).toString(), 'center')
        );
        elements.push(
          createLabel([x, height / 2 + 0.05, 0], (i * 10).toString(), 'center')
        );
      }
    }

    // Create horizontal lines and labels
    for (let i = 0; i < numLinesY; i++) {
      const y = i * gridSize - height / 2;
      elements.push(
        createLine(
          new THREE.Vector3(-width / 2, y, 0),
          new THREE.Vector3(width / 2, y, 0),
          `horizontal-${i}`
        )
      );

      // Add labels at regular intervals (e.g., every 5 lines)
      if (i % 2 === 0) {
        elements.push(
          createLabel([-width / 2 - 0.05, y, 0], (i * 10).toString(), 'right')
        );
        elements.push(
          createLabel([width / 2 + 0.05, y, 0], (i * 10).toString(), 'left')
        );
      }
    }

    return elements;
  }, [width, height, gridSize]);

  return (
    <group visible={visible} position={[-xOffset, -yOffset, -zOffset]}>
      {gridElements}
    </group>
  );
};

export default BackgroundBoard;
