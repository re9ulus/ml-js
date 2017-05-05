import * as M from './MathUtils';

class Scaler {

  standardize(data) {
    if (data.length === 0) {
      return data;
    }
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
