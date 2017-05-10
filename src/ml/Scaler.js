import * as Mth from './MathUtils';
import * as Matrix from './Matrix';

class Scaler {

  _standardizeMatrix(data) {
    if (data.length === 0 || data[0].length === 0) {
      return data;
    }
    const nRows = data.length;
    const means = Mth.matrixMeanCols(data);
    let stds = new Array(data[0].length).fill(0);
    for (const row of data) {
      stds = Matrix.add(stds, Matrix.pow(Matrix.sub(row, means), 2));
    }
    stds = stds.map((val) => val === 0 ? 1 : val);
    stds = stds.map((val) => Math.sqrt(val / nRows));
    data = data.map((row) => Matrix.div(Matrix.sub(row, means), stds));
    return data;
  }

  _standardizeArray(data) {
    if (data.length === 0) {
      return data;
    }
    const mean = Mth.mean(data);
    let std = 0;
    for (let item of data) {
      std += Math.pow(item - mean, 2);
    }
    std = Math.sqrt(std / data.length);
    if (std === 0) {
      std = 1;
    }
    return data.map((val) => (val - mean) / std);
  }

  standardize(data) {
    if (data.length === 0) {
      return data;
    }
    if (Array.isArray(data[0])) {
      return this._standardizeMatrix(data);
    } else {
      return this._standardizeArray(data);
    }
  }

  // ToDo: Add matrix version of normalize
  // ToDo: Add tests
  normalize(data) {
    if (data.length === 0) {
      return data;
    }

    let minVal = data[0];
    let maxVal = data[0];

    for (let item of data) {
      if (item < minVal) {
        minVal = item;
      }
      if (item > maxVal) {
        maxVal = item;
      }
    }

    const denominator = maxVal - minVal;
    if (denominator === 0) {
      throw new Error('Can not normalize data, maxVal is equal to minVal, division by zero.');
    }

    for (let i = 0; i < data.length; ++i) {
      data[i] = (data[i] - minVal) / denominator;
    }
    return data;
  }
}

export { Scaler };
