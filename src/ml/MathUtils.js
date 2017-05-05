function mean(data) {
  if (data.length === 0) {
    return 0;
  }
  return data.reduce((a, b) => a + b, 0) / data.length;
};

export { mean };
