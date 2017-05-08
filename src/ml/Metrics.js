import { clip } from './MathUtils';

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

function logLoss(target, probs, eps=1e-15) {
  probs = clip(probs, eps, 1 - eps); // to prevent log(0) and log(1)
  if (target.length !== probs.length) {
    throw new Error(`Target and probabilities values have different sizes (${target.lenght} != ${probs.length})`);
  }
  if (target.length === 0) {
    return 0;
  }
  let res = 0;
  for (let i = 0; i < target.length; ++i) {
    res += -target[i] * Math.log(probs[i]) - (1 - target[i]) * Math.log(1 - probs[i]);
  }
  res /= target.length;
  return res;
}

function multiLogLoss(target, probs) {
  console.log('Not implemented');
}

export { meanSquaredError, logLoss, multiLogLoss };
