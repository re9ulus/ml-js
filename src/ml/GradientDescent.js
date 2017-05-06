import { meanSquaredError } from './Metrics';
import * as M from './Matrix';

// ToDo: Add minibatch sgd
// ToDo: Add callback to call on each iteration (print score)
class OnlineGradientDescentOptimizer {
  constructor(bias_func, weight_func) {
    this.bias_func = bias_func;
    this.weight_func = weight_func;
  }


  // predictSingle(bias, w1, item) {
  //   return bias + w1 * item;
  // }
  //
  // predict(data, weights, bias) {
  //   let pred = []; // ToDo: Use map
  //   for (let item of data) {
  //     pred.push(this.predictSingle(bias, weights, item));
  //   }
  //   return pred;
  // }

  predict(data, weights, bias) {
    return M.add(bias, M.dot(data, weights));
  }

  optimizeOld(data, target, eta, n_iter) {
    let bias = 1;
    let weights = 0;
    let newBias = bias;
    let newWeights = weights;
    for (let iter = 0; iter < n_iter; ++iter) {
      for (let i = 0; i < data.length; ++i) {
        newBias += eta * this.bias_func(bias, weights, data[i], target[i]);
        newWeights += eta * this.weight_func(bias, weights, data[i], target[i]);
        bias = newBias;
        weights = newWeights;
      }

      console.log(iter, 'error: ', meanSquaredError(target, this.predict(bias, weights, data)));
    }
    return [bias, weights];
  }

  optimize(data, target, eta, n_iter) {
    const nRows = data.length;
    const nCols = data[0].length;

    let bias = 1;
    let weights = new Array(nCols).fill(0);
    let newBias = bias;
    let newWeights = weights.slice();
    for (let iter = 0; iter < n_iter; ++iter) {
      for (let i = 0; i < data.length; ++i) {
        // newBias += eta * this.bias_func(bias, weights, data[i], target[i]);
        // newWeights += eta * this.weight_func(bias, weights, data[i], target[i]);

        newBias = M.add(newBias, M.mul(eta, this.bias_func(bias, weights, data[i], target[i])));
        newWeights = M.add(newWeights, M.mul(eta, this.weight_func(bias, weights, data[i], target[i])));
        bias = newBias;
        weights = newWeights.slice();
      }
      console.log(iter, bias, weights[0], 'error: ', meanSquaredError(target, this.predict(data, weights, bias)));
    }
    return [bias, weights];
  }

}

export { OnlineGradientDescentOptimizer };
