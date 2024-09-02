// angle to radians
export function angleToRadians(angle) {
  var radians = 0;
  radians = angle * (Math.PI / 180);
  return radians;
}

// Utility function to convert cm to inches
export function cmToInches(cm) {
  return (cm / 2.54).toFixed(2);
}
