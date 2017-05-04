class SimpleGradientDescentOptimizer {
  constructor(weight_func, bias_func, labels, data) {
    this.weight_func = weight_func;
    this.bias_func = bias_func;
    // this.labels = labels;
    // this.data = data;
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
      console.log(bias, weights);
    }
    return [bias, weights];
  }
}

export { SimpleGradientDescentOptimizer };
