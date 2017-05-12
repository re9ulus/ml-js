import { SimpleLinearModel, LinearModel } from './LinearModel';
import { GradientDescentOptimizer } from './GradientDescent'
import { sigmoid } from './MathUtils';
import { logLoss } from './Metrics';
import * as M from './Matrix';

class SimpleLogisticRegression extends SimpleLinearModel {
  fit(data, target, eta=0.001, n_iter=100) {
    let optimizer = new GradientDescentOptimizer(
      (item, target, bias, w) => target - this._predictProbaSingle(item, bias, w),
      (item, target, bias, w) => (target - this._predictProbaSingle(item, bias, w)) * item,
      // (data, target, bias, weights) => {
      //   console.log('loss: ', logLoss(target,
      //     data.map((val) => this._predictProbaSingle(val, bias, weights))))
      // }
    );
    [ this.bias, this.w ] = optimizer.optimizeOnlineOld(data, target, eta, n_iter);
  }

  _predictProbaSingle(item, bias, w) {
    return sigmoid(bias + w * item);
  }

  predictProbaSingle(item) {
    return this._predictProbaSingle(item, this.bias, this.w);
  }

  predictProba(data) {
    return data.map((item) => this.predictProbaSingle(item));
  }

  predict(data) {
    return this.predictProba(data).map((val) => val > 0.5 ? 1 : 0);
  }

  predictSingle(item) {
    return this.predictProbaSingle(item) > 0.5 ? 1 : 0;
  }
}


class LogisticRegression extends LinearModel {
  fit(data, target, eta=0.001, n_iter=100) {
    let optimizer = new GradientDescentOptimizer(
      (data, target, bias, weights) => M.sub(
        target,
        this._predictProba(data, bias, weights)),
      (data, target, bias, weights) => M.dot(
        M.sub(target,
              this._predictProba(data, bias, weights)),
        data),
      // (data, target, bias, weights) => {
      //   console.log('loss: ', logLoss(target,
      //     this._predictProba(data, bias, weights)))
      // }
    );

    let errors = [];
    [ this.bias, this.weights, errors ] = optimizer.optimizeOnline(data, target, eta, n_iter);
    return errors;
  }

  _predictProba(data, bias, weights) {
    return  M.sigmoid(M.add(bias, M.dot(data, weights)));
  }

  predictProba(data) {
    return this._predictProba(data, this.bias, this.weights);
  }

  predict(data) {
    return this.predictProba(data).map((val) => val > 0.5 ? 1 : 0);
  }

  predictSingle(item) {
    return M.sigmoid(M.add(this.bias + M.dot(item, this.weights)));
  }

  predictProbaSingle(item) {
    return this.predictProba(item) > 0.5 ? 1 : 0;
  }
}


export { SimpleLogisticRegression, LogisticRegression };
