import { SimpleLinearModel, LinearModel } from './LinearModel';
import { GradientDescentOptimizer } from './GradientDescent'
import { sigmoid } from './MathUtils';
import { logLoss } from './Metrics';
import * as M from './Matrix';

class SimpleLogisticRegression extends SimpleLinearModel {
  fit(data, target, eta=0.001, n_iter=100) {

    const pr = (item, bias, w) => sigmoid(bias + w * item);
    let optimizer = new GradientDescentOptimizer(
      (item, target, bias, w) => target - pr(item, bias, w),
      (item, target, bias, w) => (target - pr(item, bias, w)) * item,
      (data, bias, w) => data.map((val) => pr(val, bias, w)),
      (target, probs) => logLoss(target, probs)
    );
    [ this.bias, this.w1 ] = optimizer.optimizeOnlineOld(data, target, eta, n_iter);
  }

  predictProbaSingle(item) {
    return sigmoid(this.bias + this.w1 * item);
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

    const pr = (data, bias, weights) => M.sigmoid(
        M.add(bias,
        M.dot(data, weights)));

    let optimizer = new GradientDescentOptimizer(
      (data, target, bias, weights) => M.sub(
        target,
        pr(data, bias, weights)),
      (data, target, bias, weights) => M.dot(
        M.sub(target,
              pr(data, bias, weights)),
        data),
      (data, bias, weights) => pr(data, bias, weights),
      (real, pred) => logLoss(real, pred)
    );

    let errors = [];
    [ this.bias, this.weights, errors ] = optimizer.optimizeOnline(data, target, eta, n_iter);
    return errors;
  }

  predictProba(data) {
    return M.sigmoid(M.add(this.bias, M.dot(data, this.weights)));
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
