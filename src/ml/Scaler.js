import * as M from './MathUtils';

class Scaler {

  standardizeMatrix(data) {
    if (data.length === 0 || data[0].length === 0) {
      return data;
    }
    const nRows = data.length;
    const nCols = data[0].length;
    const means = M.matrixMeanCols(data);
    let stds = new Array(data[0].length).fill(0);
    for (let row of data) {
      for (let i = 0; i < nCols; ++i) {
        stds[i] += Math.pow(row[i] - means[i], 2);
      }
    }
    stds = stds.map((val) => Math.sqrt(val / nRows));
    console.log('means: ', means, 'stds: ', stds);
    for (let row of data) {
      for (let i = 0; i < nCols; ++i) {
        row[i] = (row[i] - means[i]) / stds[i];
      }
    }
    return data;
  }

  standardizeArray(data) {
    const mean = M.mean(data);
    let std = 0;
    for (let item of data) {
      std += Math.pow(item - mean, 2);
    }
    std /= data.length;
    std = Math.sqrt(std);
    for (let i = 0; i < data.length; ++i) {
      data[i] = (data[i] - mean) / std;
    }

    return data;
  }

  standardize(data) {
    if (data.length === 0) {
      return data;
    }

    if (Array.isArray(data[0])) {
      return this.standardizeMatrix(data);
    } else {
      return this.standardizeArray(data);
    }

  }

  // ToDo: Add matrix version of normalize
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
