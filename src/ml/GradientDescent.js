import * as M from './Matrix';


// ToDo: Add callback to call on each iteration (print score)
class GradientDescentOptimizer {
  constructor(biasFunc, weightFunc, predictFunc, errorFunc) {
    this.biasFunc = biasFunc;
    this.weightFunc = weightFunc;

    this.predictFunc = predictFunc;
    this.errorFunc = errorFunc;
  }

  optimizeOnlineOld(data, target, eta, nIter) {
    // Non vectorized version for 1d, used for testing
    let bias = 1;
    let weights = 0;
    let newBias = bias;
    let newWeights = weights;
    for (let iter = 0; iter < nIter; ++iter) {
      for (let i = 0; i < data.length; ++i) {
        newBias += eta * this.biasFunc(data[i], target[i], bias, weights);
        newWeights += eta * this.weightFunc(data[i], target[i], bias, weights);
        bias = newBias;
        weights = newWeights;
      }
      if (this.errorFunc && this.predictFunc) {
        console.log(iter, bias, weights, 'error: ', this.errorFunc(target, this.predictFunc(data, bias, weights)));
        // console.log(iter, 'error: ', this.errorFunc(target, this.predictFunc(data, bias, weights)));
      }
    }
    return [ bias, weights ];
  }

  optimizeOnline(data, target, eta, nIter) {
    return this.optimizeBatch(data, target, eta, nIter, 1);
  }

  _createBatch(arr, start, num) {
    return arr.slice(start, start + num);
  }

  optimizeBatch(data, target, eta, nIter, batchSize=5) {
    // ToDo: Add randomization
    const nRows = data.length;
    const nCols = data[0].length;

    let bias = 1;
    let weights = new Array(nCols).fill(0);
    let newBias = bias;
    let newWeights = weights.slice();
    let errors = [];
    for (let iter = 0; iter < nIter; ++iter) {
      for (let i = 0; i < nRows; i += batchSize) {
        const batchData = this._createBatch(data, i, batchSize);
        const batchTarget = this._createBatch(target, i, batchSize);
        newBias = M.add(newBias, M.mul(eta, this.biasFunc(batchData, batchTarget, bias, weights)))[0];
        newWeights = M.add(newWeights, M.mul(eta, this.weightFunc(batchData, batchTarget, bias, weights)));
        bias = newBias;
        weights = newWeights.slice();
      }
      if (this.predictFunc && this.errorFunc) {
        let err = this.errorFunc(target, this.predictFunc(data, bias, weights));
        console.log(iter, bias, weights[0], 'error: ', err);
        errors.push(err);
      }
    }
    return [ bias, weights, errors ];
  }

  optimize(data, target, eta, nIter) {
    // ToDo: Investigate why value is worse then for online algo
    // Local minumum ? Is it possible ?
    return this.optimizeBatch(data, target, eta, nIter, data.length);
  }

}

export { GradientDescentOptimizer };
