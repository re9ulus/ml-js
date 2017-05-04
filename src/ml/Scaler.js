class Scaler {
  
  scale(data) {
    if (data.length === 0) {
      return data;
    }
    const mean = data.reduce((a, b) => a + b, 0) / data.length;

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
}

export { Scaler };
