import { GradientDescentOptimizer } from './GradientDescent';
import { LinearModel, SimpleLinearModel } from './LinearModel';
import * as M from './Matrix';

/*
  TODO:
  1. Add data loader
  2. Add data visualization
  3. Add tests
*/

class SimpleLinearRegression extends SimpleLinearModel {
  fit(data, target, eta=0.001, n_iter=100) {
    let optimizer = new GradientDescentOptimizer(
      (bias, w, item, target) => target - (bias + w * item),
      (bias, w, item, target) => (target - (bias + w * item)) * item
    );
    [ this.bias, this.w1 ] = optimizer.optimizeOnlineOld(data, target, eta, n_iter);
  }

  predictSingle(item) {
    return this.bias + this.w1 * item;
  }
}

class LinearRegression extends LinearModel {
  fit(data, target, eta=0.001, n_iter=100) {
    let optimizer = new GradientDescentOptimizer(
      (bias, weights, item, target) => { return M.sub(
          target,
          M.add(bias,
            M.dot(weights, item)))},
      (bias, weights, item, target) => M.dot(
        M.sub(target,
          M.add(bias,
            M.dot(weights, item))),
        item)
    );

    let errors = [];
    [ this.bias, this.weights, errors ] = optimizer.optimizeOnline(data, target, eta, n_iter);
    // [ this.bias, this.weights ] = optimizer.optimize(data, target, eta, n_iter);
    return errors;
  }

  predict(data) {
    return M.add(this.bias, M.dot(data, this.weights));
  }

  predictSingle(item) {
    return this.bias + M.dot(item, this.weights);
  }
}

export { SimpleLinearRegression, LinearRegression };
