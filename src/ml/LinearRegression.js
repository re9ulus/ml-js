import { OnlineGradientDescentOptimizer } from './GradientDescent';
import * as M from './Matrix';

/*
  TODO:
  1. Write matrix version
  2. Write minibutch version
  3. Add data loader
  4. Add data visualization
  5. Add tests
*/

class SimpleLinearModel {
  constructor() {
    this.bias = 1;
    this.w1 = 0;
  }

  fit(data, target) {
    console.log('not implemented');
  }

  predictSingle(item) {
    console.log('not implemented');
  }

  predict(data) {
    return data.map((item) => this.predictSingle(item));
  }
}


class SimpleLinearRegression extends SimpleLinearModel {
  fit(data, target, eta=0.001, n_iter=100) {
    let optimizer = new OnlineGradientDescentOptimizer(
      (bias, w, item, target) => target - (bias + w * item),
      (bias, w, item, target) => (target - (bias + w * item)) * item
    );
    [ this.bias, this.w1 ] = optimizer.optimize(data, target, eta, n_iter);
  }

  predictSingle(item) {
    return this.bias + this.w1 * item;
  }
}


class LinearModel {
  constructor() {
    this.bias = 1;
    this.weights = [1];
  }

  fit(data, target) {
    console.log('not implemented');
  }

  predictSingle(item) {
    console.log('not implemented');
  }

  predict(data) {
    let pred = []; // ToDo: Use map
    for (let item of data) {
      pred.push(this.predictSingle(item));
    }
    return pred;
  }
}


class LinearRegression extends LinearModel {
  fit(data, target, eta=0.001, n_iter=100) {

    console.log('Test dot product: ', M.dot([1,2,3], [4,5,6]));

    let optimizer = new OnlineGradientDescentOptimizer(
      (bias, weights, item, target) => M.sub(
        target,
        M.add(bias,
          M.dot(weights, item))),
      (bias, weights, item, target) => M.dot(
        M.sub(target,
          M.add(bias,
            M.dot(weights, item))),
        item)
    );
    [ this.bias, this.weights ] = optimizer.optimize(data, target, eta, n_iter);
  }

  predict(data) {
    return M.add(this.bias, M.dot(data, this.weights));
  }

  predictSingle(item) {
    return this.bias + M.dot(item, this.weights);
  }
}

export { SimpleLinearRegression };
