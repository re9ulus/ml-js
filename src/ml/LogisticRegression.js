import { SimpleLinearModel } from './LinearModel';
import { GradientDescentOptimizer } from './GradientDescent'
import { sigmoid } from './MathUtils';
import { logLoss } from './Metrics';

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

export { SimpleLogisticRegression };
