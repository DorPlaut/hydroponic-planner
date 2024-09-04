// Function to calculate all measurements and materials
export default function calculateHydroponicsSystem(params) {
  const { width, height, numTubes, holesPerTube, holeSize, tubeRadius } =
    params;

  const adjustedWidth = width;
  const adjustedHeight = height;
  const adjustedTubeRadius = tubeRadius / 2;
  const adjustedHoleSize = holeSize;

  const tubeSpacing = adjustedHeight / (numTubes + 1);
  const tubeLength = adjustedWidth - adjustedTubeRadius * 8;
  const numberOfPlants = numTubes * holesPerTube;
  const reservoirSize = Math.max(20, numberOfPlants * 2); // Minimum 20L, 2L per plant
  const reservoirHeight = reservoirSize / 100;

  const verticalTubeLength = tubeSpacing - adjustedTubeRadius * 4;

  const wallStandHeight = adjustedHeight - tubeSpacing;

  const pumpTubeLength =
    adjustedHeight +
    reservoirHeight * 100 -
    tubeSpacing +
    adjustedTubeRadius / 2 +
    0.5;

  const horizontalConnectorLength =
    numTubes % 2 === 0
      ? (adjustedWidth - tubeLength) / 2
      : (adjustedWidth + tubeLength - adjustedTubeRadius * 2) / 2.05;

  return {
    dimensions: {
      width: adjustedWidth,
      height: adjustedHeight,
      depth: adjustedTubeRadius * 4,
    },
    tubes: {
      mainTubes: {
        quantity: numTubes,
        length: tubeLength,
        diameter: adjustedTubeRadius * 2,
      },
      verticalConnectors: {
        big: {
          quantity: numTubes,
          length: verticalTubeLength,
          diameter: adjustedTubeRadius * 2,
        },
        small: {
          quantity: 1,
          length: adjustedTubeRadius * 1.25,
          diameter: adjustedTubeRadius,
        },
      },
      //
      pumpTube: {
        quantity: 1,
        length: pumpTubeLength,
        diameter: adjustedTubeRadius,
      },
      horizontalConnector: {
        quantity: 1,
        length: horizontalConnectorLength,
        diameter: adjustedTubeRadius,
      },
    },
    elbows: {
      big: {
        quantity: numTubes * 2 - 1,
        diameter: adjustedTubeRadius * 2,
      },
      small: {
        quantity: 2,
        diameter: adjustedTubeRadius,
      },
    },
    endCaps: {
      quantity: 1,
      diameter: adjustedTubeRadius * 2,
    },
    netPots: {
      quantity: numberOfPlants,
      diameter: adjustedHoleSize,
    },
    reservoir: {
      capacity: reservoirSize,
      height: reservoirHeight * 100, // Convert back to cm
    },
    wallStand: {
      planks: {
        quantity: 2,
        langth: wallStandHeight,
        width: 5,
      },
      tubeStraps: {
        quantity: numTubes * 2,
        diameter: adjustedTubeRadius * 2,
      },
    },
    // Additional information
    misc: {
      numberOfPlants,
      holeSpacing: tubeLength / (holesPerTube + 1),
    },
  };
}
