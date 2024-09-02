export default function Controls({
  params,
  paramConstraints,
  updateParams,
  toggleFlip,
  toggleBackgroundBoard,
  showBackgroundBoard,
  toggleWallStand,
  showWallStand,
  toggleBlueprint,
  blueprintMode,
  showPlants,
  toggleShowPlants,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateParams({ [name]: parseFloat(value) });
  };

  return (
    <div className="controls">
      {/* <h2>Setup Parameters</h2> */}
      {Object.entries(params).map(([key, value]) => {
        const { min, max, step } = paramConstraints[key];

        return (
          <div className="control" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              min={min}
              max={max}
              step={step}
            />
          </div>
        );
      })}
      <button className="btn control-btn" onClick={toggleFlip}>
        Flip Model
      </button>
      <br />
      <button className="btn control-btn" onClick={toggleBackgroundBoard}>
        {showBackgroundBoard ? 'Hide' : 'Show'} Background Board
      </button>
      <br />
      <button className="btn control-btn" onClick={toggleWallStand}>
        {showWallStand ? 'Hide' : 'Show'} Wall Stand
      </button>
      <br />
      <button className="btn control-btn" onClick={toggleBlueprint}>
        {blueprintMode ? '3D View' : 'Blueprint Mode'}
      </button>
      <br />
      <button className="btn control-btn" onClick={toggleShowPlants}>
        {showPlants ? 'Hide' : 'Show'} Plants
      </button>
    </div>
  );
}
