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

export { mean, matrixMeanCols, getRandomInt };
