class SimpleLinearModel {
  constructor() {
    this.bias = 1;
    this.w = 0;
  }

  fit(data, target) {
    console.log('not implemented');
    throw new Error('SimpleLinearModel.fit not implemented.');
  }

  predictSingle(item) {
    console.log('not implemented');
    throw new Error('SimpleLinearModel.predictSingle not implemented.');
  }

  predict(data) {
    return data.map((item) => this.predictSingle(item));
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
    return data.map((row) => this.predictSingle(row));
  }
}

export { SimpleLinearModel, LinearModel };
