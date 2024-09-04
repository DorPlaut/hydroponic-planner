import calculateHydroponicsSystem from '@/utils/calculateHydroponicsSystem';
import { useEffect, useState } from 'react';
import ListActions from './ListActions';

export default function MaterialsList({ params, topOffset }) {
  const system = calculateHydroponicsSystem(params);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(system);
  }, []);

  const materials = [
    {
      title: 'Pipes',
      items: [
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
      ],
    },
    {
      title: 'Connectors',
      items: [
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
      ],
    },
    {
      title: 'End Caps',
      items: [
        `${system.endCaps.quantity} End caps (${system.endCaps.diameter.toFixed(
          1
        )} cm diameter)`,
      ],
    },
    {
      title: 'Growing Containers',
      items: [
        `${system.netPots.quantity} Net pots (${system.netPots.diameter.toFixed(
          1
        )} cm diameter)`,
      ],
    },
    {
      title: 'Water System',
      items: [
        `1 Water reservoir (${system.reservoir.capacity.toFixed(
          1
        )} L capacity)`,
        `1 Water pump (capable of ${system.dimensions.height.toFixed(
          1
        )} cm vertical lift)`,
        '1 Air pump with air stone',
        `Tubing for water circulation (${system.dimensions.height.toFixed(
          1
        )} cm)`,
      ],
    },
    {
      title: 'Support Structure',
      items: [
        `${system.wallStand.planks.quantity} wood/metal planks (${system.wallStand.planks.langth}cm x ${system.wallStand.planks.width}cm)`,
        `${system.wallStand.tubeStraps.quantity} Tube straps (${system.wallStand.tubeStraps.diameter}cm diameter)`,
      ],
    },
  ];

  // Function to get letter for numbering
  const getLetter = (index) => {
    return String.fromCharCode(97 + index).toUpperCase(); // 97 is the ASCII code for 'a'
  };

  return (
    <div
      className="materials-container"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(-25rem)',
        top: `${topOffset}px`,
      }}
    >
      <button
        className="btn materials-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide' : 'Show'} materials list
      </button>
      <ListActions materials={materials} />
      <div className="materials">
        <h2>Materials List</h2>
        {materials.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex}>
              <h3>{section.title}</h3>
              <ol style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {section.items.map((item, itemIndex) => {
                  const letterIndex =
                    materials
                      .slice(0, sectionIndex)
                      .reduce((acc, s) => acc + s.items.length, 0) + itemIndex;
                  return (
                    <li key={itemIndex}>
                      <strong>{getLetter(letterIndex)}.</strong> {item}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
