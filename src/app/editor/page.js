'use client';
import React, { use, useRef, useState, useEffect } from 'react';
import HydroponicSystem from '../three_components/HydroponicSystem';
import Controls from './Controls';
import MaterialsList from './MaterialsList';
import Measurements from './Measurements';

const EditorPage = () => {
  const [params, setParams] = useState({
    width: 120, // in cm
    height: 220, // in cm
    numTubes: 4,
    holesPerTube: 4,
    holeSize: 5, // in cm
    tubeRadius: 10, // in cm
    slope: 2, // in percentage (1% to 3% recommended)
  });
  const paramConstraints = {
    width: { min: 100, max: 500, step: 5 },
    height: { min: 100, max: 500, step: 5 },
    numTubes: { min: 1, max: 10, step: 1 },
    holesPerTube: { min: 1, max: 10, step: 1 },
    holeSize: { min: 2.5, max: 10, step: 0.5 },
    tubeRadius: { min: 5, max: 20, step: 0.5 },
    slope: { min: 0, max: 3, step: 0.1 },
  };

  const [flipped, setFlipped] = useState(false);
  const [showBackgroundBoard, setShowBackgroundBoard] = useState(true);
  const [showWallStand, setShowWallStand] = useState(true);
  const [blueprintMode, setBluprintMode] = useState(false);
  const [showPlants, setShowPlants] = useState(true);

  const updateParams = (newParams) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const toggleFlip = () => {
    setFlipped((prevFlipped) => !prevFlipped);
  };

  const toggleBackgroundBoard = () => {
    setShowBackgroundBoard((prevShow) => !prevShow);
  };

  const toggleWallStand = () => {
    setShowWallStand((prevShow) => !prevShow);
  };

  const toggleBlueprint = () => {
    setBluprintMode((prevMode) => !prevMode);
  };

  const toggleShowPlants = () => {
    setShowPlants((prevShow) => !prevShow);
  };

  // refs for height contorl
  const headerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);

  // set canvas heigt
  const setCanvasHeight = () => {
    const headerHeight = headerRef.current.offsetHeight;
    const controlsHeight = controlsRef.current.offsetHeight;
    canvasRef.current.style.height = `calc(100vh - ${headerHeight}px - ${controlsHeight}px)`;
  };
  useEffect(() => {
    setCanvasHeight();
    window.addEventListener('resize', setCanvasHeight);
    return () => {
      window.removeEventListener('resize', setCanvasHeight);
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header" ref={headerRef}>
        <h1>Hydroponic Setup Builder and Planner</h1>
      </header>
      <div className="controls-container" ref={controlsRef}>
        <Controls
          params={params}
          paramConstraints={paramConstraints}
          updateParams={updateParams}
          toggleFlip={toggleFlip}
          toggleBackgroundBoard={toggleBackgroundBoard}
          showBackgroundBoard={showBackgroundBoard}
          toggleWallStand={toggleWallStand}
          showWallStand={showWallStand}
          toggleBlueprint={toggleBlueprint}
          blueprintMode={blueprintMode}
          showPlants={showPlants}
          toggleShowPlants={toggleShowPlants}
        />
      </div>
      <div className="canvas-container" ref={canvasRef}>
        <HydroponicSystem
          params={params}
          flipped={flipped}
          showBackgroundBoard={showBackgroundBoard}
          showWallStand={showWallStand}
          blueprintMode={blueprintMode}
          showPlants={showPlants}
        />
      </div>
      <Measurements params={params} />
      <MaterialsList params={params} />
    </div>
  );
};

export default EditorPage;
