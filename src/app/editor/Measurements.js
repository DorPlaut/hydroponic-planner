import calculateHydroponicsSystem from '@/utils/calculateHydroponicsSystem';
import { cmToInches } from '@/utils/utils';
import { useState } from 'react';

export default function Measurements({ params }) {
  const system = calculateHydroponicsSystem(params);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="measurements-container"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(25rem)' }}
    >
      <button
        className="btn measurements-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide' : 'Show'} Measurements
      </button>

      <div className="measurements">
        <h2>Measurements</h2>
        <ul>
          <li>
            Width: {system.dimensions.width.toFixed(1)} cm (
            {cmToInches(system.dimensions.width)} inches)
          </li>
          <li>
            Height: {system.dimensions.height.toFixed(1)} cm (
            {cmToInches(system.dimensions.height)} inches)
          </li>
          <li>
            Depth: {system.dimensions.depth.toFixed(1)} cm (
            {cmToInches(system.dimensions.depth)} inches)
          </li>
          <li>Number of Plants: {system.misc.numberOfPlants}</li>
          <li>Number of Tubes: {system.tubes.mainTubes.quantity}</li>
          <li>Holes per Tube: {params.holesPerTube}</li>
          <li>
            Hole Size: {system.netPots.diameter.toFixed(1)} cm (
            {cmToInches(system.netPots.diameter)} inches)
          </li>
          <li>
            Hole Spacing: {system.misc.holeSpacing.toFixed(1)} cm (
            {cmToInches(system.misc.holeSpacing)} inches)
          </li>
          <li>
            Tube Diameter: {system.tubes.mainTubes.diameter.toFixed(1)} cm (
            {cmToInches(system.tubes.mainTubes.diameter)} inches)
          </li>
          <li>Reservoir Size: {system.reservoir.capacity.toFixed(1)} L</li>
          <li>
            Reservoir Height: {system.reservoir.height.toFixed(1)} cm (
            {cmToInches(system.reservoir.height)} inches)
          </li>
        </ul>
      </div>
    </div>
  );
}
