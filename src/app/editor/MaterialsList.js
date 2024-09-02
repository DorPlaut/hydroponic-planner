import calculateHydroponicsSystem from '@/utils/calculateHydroponicsSystem';
import { useEffect, useState } from 'react';

export default function MaterialsList({ params }) {
  const system = calculateHydroponicsSystem(params);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(system);
  }, []);
  //

  const materials = [
    `${
      system.tubes.mainTubes.quantity
    } PVC pipes (${system.tubes.mainTubes.length.toFixed(
      1
    )} cm long, ${system.tubes.mainTubes.diameter.toFixed(1)} cm diameter)`,

    `${
      system.tubes.verticalConnectors.big.quantity
    } PVC pipes (${system.tubes.verticalConnectors.big.length.toFixed(
      1
    )} cm long, ${system.tubes.verticalConnectors.big.diameter.toFixed(
      1
    )} cm diameter)`,

    `${
      system.tubes.pumpTube.quantity
    } PVC pipes (${system.tubes.pumpTube.length.toFixed(
      1
    )} cm long, ${system.tubes.pumpTube.diameter.toFixed(1)} cm diameter)`,

    `${
      system.tubes.verticalConnectors.small.quantity
    } PVC pipes (${system.tubes.verticalConnectors.small.length.toFixed(
      1
    )} cm long, ${system.tubes.verticalConnectors.small.diameter.toFixed(
      1
    )} cm diameter)`,

    `${
      system.tubes.horizontalConnector.quantity
    } PVC pipes (${system.tubes.horizontalConnector.length.toFixed(
      1
    )} cm long, ${system.tubes.horizontalConnector.diameter.toFixed(
      1
    )} cm diameter)`,

    `${
      system.elbows.big.quantity
    } 90 degree elbow PVC Connectors (${system.elbows.big.diameter.toFixed(
      1
    )} cm diameter)`,

    `${
      system.elbows.small.quantity
    } 90 degree elbow PVC Connectors (${system.elbows.small.diameter.toFixed(
      1
    )} cm diameter)`,

    `${system.endCaps.quantity} End caps (${system.endCaps.diameter.toFixed(
      1
    )} cm diameter)`,

    `${system.netPots.quantity} Net pots (${system.netPots.diameter.toFixed(
      1
    )} cm diameter)`,

    `1 Water reservoir (${system.reservoir.capacity.toFixed(1)} L capacity)`,

    `1 Water pump (appropriate for ${system.reservoir.capacity.toFixed(
      1
    )} L capacity)`,

    '1 Air pump with air stone',

    `Tubing for water circulation (length depends on setup, recommend at least ${system.dimensions.height.toFixed(
      1
    )} cm)`,

    'Nutrient solution',

    'Growing medium (e.g., rockwool, perlite, or clay pebbles)',
  ];

  return (
    <div
      className="materials-container"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-25rem)' }}
    >
      <button
        className="btn materials-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide' : 'Show'} materials list
      </button>
      <div className="materials">
        <h2>Materials List</h2>
        <ul>
          {materials.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
