import { meanSquaredError } from './Metrics';
import * as Mth from './MathUtils';
import * as M from './Matrix';

// ToDo: Add minibatch sgd
// ToDo: Add callback to call on each iteration (print score)
class GradientDescentOptimizer {
  constructor(bias_func, weight_func) {
    this.bias_func = bias_func;
    this.weight_func = weight_func;
  }

  predict(data, weights, bias) {
    return M.add(bias, M.dot(data, weights));
  }

  optimizeOnlineOld(data, target, eta, nIter) {
    // Non vectorized version for 1d, used for testing
    let bias = 1;
    let weights = 0;
    let newBias = bias;
    let newWeights = weights;
    for (let iter = 0; iter < nIter; ++iter) {
      for (let i = 0; i < data.length; ++i) {
        newBias += eta * this.bias_func(bias, weights, data[i], target[i]);
        newWeights += eta * this.weight_func(bias, weights, data[i], target[i]);
        bias = newBias;
        weights = newWeights;
      }

      console.log(iter, 'error: ', meanSquaredError(target, this.predict(bias, weights, data)));
    }
    return [ bias, weights ];
  }

  optimizeOnline(data, target, eta, nIter) {
    return this.optimizeBatch(data, target, eta, nIter, 1);
    // const nRows = data.length;
    // const nCols = data[0].length;
    // const useRand = true;
    //
    // let bias = 1;
    // let weights = new Array(nCols).fill(0);
    // let newBias = bias;
    // let newWeights = weights.slice();
    // let currInd = 0;
    // for (let iter = 0; iter < nIter; ++iter) {
    //   for (let i = 0; i < nRows; ++i) {
    //
    //     currInd = useRand
    //       ? Mth.getRandomInt(0, nRows)
    //       : i;
    //
    //     newBias = M.add(newBias, M.mul(eta, this.bias_func(bias, weights, data[currInd], target[currInd])));
    //     newWeights = M.add(newWeights, M.mul(eta, this.weight_func(bias, weights, data[currInd], target[currInd])));
    //     bias = newBias;
    //     weights = newWeights.slice();
    //   }
    //   console.log(iter, bias, weights.toString(), 'error: ', meanSquaredError(target, this.predict(data, weights, bias)));
    // }
    // return [ bias, weights ];
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
    for (let iter = 0; iter < nIter; ++iter) {
      for (let i = 0; i < nRows; i += batchSize) {
        const batchData = this._createBatch(data, i, batchSize);
        const batchTarget = this._createBatch(target, i, batchSize);
        newBias = M.add(newBias, M.mul(eta, this.bias_func(bias, weights, batchData, batchTarget)))[0];
        newWeights = M.add(newWeights, M.mul(eta, this.weight_func(bias, weights, batchData, batchTarget)));
        bias = newBias;
        weights = newWeights.slice();
      }
      console.log(iter, bias, weights[0], 'error: ', meanSquaredError(target, this.predict(data, weights, bias)));
    }
    return [ bias, weights ];
  }

  optimize(data, target, eta, nIter) {
    // ToDo: Investigate why value is worse then for online algo
    // Local minumum ? Is it possible ?
    const nRows = data.length;
    const nCols = data[0].length;

    let bias = 1;
    let weights = new Array(nCols).fill(0);
    let newBias = bias;
    let newWeights = weights.slice();
    for (let iter = 0; iter < nIter; ++iter) {
      newBias = M.add(newBias, M.mul(eta, this.bias_func(bias, weights, data, target)))[0]; // bias must be a scalar
      newWeights = M.add(newWeights, M.mul(eta, this.weight_func(bias, weights, data, target)));
      bias = newBias;
      weights = newWeights.slice();
      console.log(iter, bias, weights.toString(), 'error: ', meanSquaredError(target, this.predict(data, weights, bias)));
    }
    return [ bias, weights ];
  }

}

export { GradientDescentOptimizer };
