import { clip } from './MathUtils';

function meanSquaredError(real, pred) {
  if (real.length !== pred.length) {
    throw new Error(`Real and predicted arrays have different sizes (${real.length} != ${pred.length})`);
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
  if (target.length !== probs.length) {
    throw new Error(`Target and probabilities arrays have different sizes (${target.lenght} != ${probs.length})`);
  }
  if (target.length === 0) {
    return 0;
  }
  probs = clip(probs, eps, 1 - eps); // to prevent log(0) and log(1)
  let res = 0;
  for (let i = 0; i < target.length; ++i) {
    if (target[i]) {
      res += -Math.log(probs[i]);
    } else {
      res += -Math.log(1 - probs[i]);
    }
  }
  res /= target.length;
  return res;
}

function multiLogLoss(target, probs) {
  console.log('Not implemented');
  throw new Error('multiLogLoss not implemented');
}

function accuracy(target, pred) {
  if (target.length !== pred.length) {
    throw new Error(`Target and predicted arrays have different sizes (${target.lenght} != ${pred.length})`);
  }
  if (target.length === 0) {
    return 1;
  }
  let res = 0;
  for (let i = 0; i < target.length; ++i) {
    if (target[i] === pred[i]) {
      res += 1;
    }
  }
  res /= target.length;
  return res;
}

export { meanSquaredError, logLoss, multiLogLoss, accuracy };
