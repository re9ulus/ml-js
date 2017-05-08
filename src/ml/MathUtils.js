function mean(data) {
  if (data.length === 0) {
    return 0;
  }
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function matrixMeanCols(data) {
  const nRows = data.length;
  const nCols = data[0].length;
  let means = new Array(nCols).fill(0);
  for (let row of data) {
    for (let i = 0; i < nCols; ++i) {
      means[i] += row[i];
    }
  }
  means = means.map((val) => val /= nRows);
  return means;
}

function getRandomInt(minVal, maxVal) { // [minVal, maxVal)
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

function sigmoid(val) {
  // ToDo: Test
  // M.div(1.0, M.add(1.0, M.pow(val, Math.E)));
  return 1.0 / (1.0 + Math.exp(-val));
}

function clip(arr, minVal, maxVal) {
  /*Values outside interval [minVal, maxVal] are clipped to interval edges*/
  // ToDo: Test
  return arr.map((minVal) => {
    if (val < minVal) {
      return minVal;
    }
    if (val > maxVal) {
      return maxVal;
    }
    return val;
  });
}

export { mean, matrixMeanCols, getRandomInt, sigmoid };
