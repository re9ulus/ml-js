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

  predictSingle(item) {
    return sigmoid(this.bias + this.w1 * item);
  }
}


class LogisticRegression extends LinearModel {
  fit(data, target, eta=0.001, n_iter=100) {

    const pr = (item, target, bias, weights) => M.sub(
        target,
        M.add(bias,
          M.dot(weights, item)));

    let optimizer = new GradientDescentOptimizer(
      (item, target, bias, weights) => pr(item, target, bias, weights),
      (item, target, bias, weights) => M.dot(
        pr(item, target, bias, weights),
        item),
      (data, bias, weights) => M.add(bias, M.dot(data, weights)),
      (real, pred) => logLoss(real, pred)
    );

    let errors = [];
    [ this.bias, this.weights, errors ] = optimizer.optimizeOnline(data, target, eta, n_iter);
    return errors;
  }

  predict(data) {
    return M.add(this.bias, M.dot(data, this.weights));
  }

  predictSingle(item) {
    return this.bias + M.dot(item, this.weights);
  }
}


export { SimpleLogisticRegression, LogisticRegression };
