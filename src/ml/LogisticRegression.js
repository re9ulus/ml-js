import { LinearModel, SimpleLinearModel } from './LinearModel';
import { sigmoid } from './MathUtils';

class SimpleLogisticRegression {
  fit(data, target, eta=0.001, n_iter=100) {
    let optimizer = new GradientDescentOptimizer(
      // (bias, w, item, target) => target - (bias + w * item),
      // (bias, w, item, target) => (target - (bias + w * item)) * item
    );
    [ this.bias, this.w1 ] = optimizer.optimizeOnlineOld(data, target, eta, n_iter);
  }

  predictSingle(item) {
    // ToDo: Test
    return sigmoid(this.w0 + this.w1 * item);
  }
}
