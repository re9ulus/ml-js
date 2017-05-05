function meanSquaredError(real, pred) {
  if (real.length !== pred.length) {
    throw new Error(`Real and predicted values have different sizes (${real.length} != ${pred.length})`);
  }
  if (real.length === 0) {
    return 0;
  }
  let s = 0;
  for (let i = 0; i < real.length; ++i) {
    s += Math.pow(real[i] - pred[i], 2);
  }
  return s / real.length;
}

export { meanSquaredError };
