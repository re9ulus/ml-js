import { GradientDescentOptimizer } from './GradientDescent';
import { LinearModel, SimpleLinearModel } from './LinearModel';
import { meanSquaredError } from './Metrics';
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
      (item, target, bias, w) => target - this._predictSingle(item, bias, w),
      (item, target, bias, w) => (target - this._predictSingle(item, bias, w)) * item,
      (data, target, bias, weights) => {
        console.log('loss: ', meanSquaredError(target,
          data.map((val) => this._predictSingle(val, bias, weights))))
      }
    );
    [ this.bias, this.w ] = optimizer.optimizeOnlineOld(data, target, eta, n_iter);
  }

  _predictSingle(item, bias, w) {
    return bias + w * item;
  }

  predictSingle(item) {
    return this._predictSingle(item, this.bias, this.w);
  }
}


class LinearRegression extends LinearModel {
  fit(data, target, eta=0.001, n_iter=100) {

    const f = (data, target, bias, weights) => M.sub(
        target,
        this._predict(data, bias, weights));

    console.log('callback', this.callback);

    let optimizer = new GradientDescentOptimizer(
      (item, target, bias, weights) => f(item, target, bias, weights),
      (item, target, bias, weights) => M.dot(
        f(item, target, bias, weights),
        item),
      (data, target, bias, weights) => {
        this.callback(data, target, bias, weights)
        // console.log('loss: ', meanSquaredError(target,
        //   this._predict(data, bias, weights)))
      }
    );

    let errors = [];
    [ this.bias, this.weights, errors ] = optimizer.optimizeOnline(data, target, eta, n_iter);
    return errors;
  }

  _predict(data, bias, weights) {
    return M.add(bias, M.dot(data, weights));
  }

  predict(data) {
    return this._predict(data, this.bias, this.weights);
  }

  predictSingle(item) {
    return M.add(this.bias, M.dot(item, this.weights));
  }
}

export { SimpleLinearRegression, LinearRegression };
