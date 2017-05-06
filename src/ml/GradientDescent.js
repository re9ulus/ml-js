import { meanSquaredError } from './Metrics';

// ToDo: Add minibatch sgd
// ToDo: Add callback to call on each iteration (print score)
class OnlineGradientDescentOptimizer {
  constructor(bias_func, weight_func) {
    this.bias_func = bias_func;
    this.weight_func = weight_func;
  }

  predict_single(bias, w1, item) {
    return bias + w1 * item;
  }

  predict(bias, w1, data) {
    let pred = []; // ToDo: Use map
    for (let item of data) {
      pred.push(this.predict_single(bias, w1, item));
    }
    return pred;
  }

  optimize(data, target, eta, n_iter) {
    let bias = 1;
    let weights = 0;
    let new_bias = bias;
    let new_weights = weights;
    for (let iter = 0; iter < n_iter; ++iter) {
      for (let i = 0; i < data.length; ++i) {
        new_bias += eta * this.bias_func(bias, weights, data[i], target[i]);
        new_weights += eta * this.weight_func(bias, weights, data[i], target[i]);
        bias = new_bias;
        weights = new_weights;
      }

      console.log(iter, 'error: ', meanSquaredError(target, this.predict(bias, weights, data)));
    }
    return [bias, weights];
  }
}

export { OnlineGradientDescentOptimizer };
