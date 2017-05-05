import { SimpleGradientDescentOptimizer } from './GradientDescent';
import * as Matrix from './Matrix';

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

  predict_single(item) {
    console.log('not implemented');
  }

  predict(data) {
    let pred = []; // ToDo: Use map
    for (let item of data) {
      pred.push(this.predict_single(item));
    }
    return pred;
  }
}


class SimpleLinearRegression extends SimpleLinearModel {
  fit(data, target, eta=0.001, n_iter=100) {

    console.log('Test dot product: ', Matrix.dot([1,2,3], [4,5,6]));


    let optimizer = new SimpleGradientDescentOptimizer(
      (bias, w, item, target) => target - (bias + w * item),
      (bias, w, item, target) => (target - (bias + w * item)) * item
    );
    [ this.bias, this.w1 ] = optimizer.optimize(data, target, eta, n_iter);
  }

  predict_single(item) {
    return this.bias + this.w1 * item;
  }
}

export { SimpleLinearRegression };
