import { Scaler } from './../Scaler';

test('Scale empty array', () => {
  expect(new Scaler().standardize([])).toEqual([]);
});

test('Scale empty matrix', () => {
  expect(new Scaler().standardize([[], []])).toEqual([[], []]);
});

test('Scale array equal', () => {
  const scaled = new Scaler().standardize([3, 3, 3]);
  const expected = [0, 0, 0];
  for (let i = 0; i < scaled.length; ++i) {
      expect(scaled[i]).toBeCloseTo(expected[i]);
  }
});

test('Scale array', () => {
  const scaled = new Scaler().standardize([-2, -1, 0, 1, 2]);
  const expected = [-1.4142, -0.7071, 0, 0.7071, 1.4142];
  for (let i = 0; i < scaled.length; ++i) {
      expect(scaled[i]).toBeCloseTo(expected[i]);
  }
});

test('Scale matrix equal cols', () => {
  const scaler = new Scaler();
  const scaled = scaler.standardize([[1, 2], [1, 2], [1, 2]]);
  const expected = [[0, 0], [0, 0], [0, 0]];
  for (let i = 0; i < scaled.length; ++i) {
    for (let j = 0; j < scaled[0].length; ++j) {
      expect(scaled[i][j]).toBeCloseTo(expected[i][j]);
    }
  }
});

test('Scale matrix equal cols', () => {
  const scaler = new Scaler();
  const scaled = scaler.standardize([[1, 3], [3, 9], [5, 6]]);
  const expected = [[-1.2247, -1.2247], [0, 1.2247], [1.2247, 0]];
  for (let i = 0; i < scaled.length; ++i) {
    for (let j = 0; j < scaled[0].length; ++j) {
      expect(scaled[i][j]).toBeCloseTo(expected[i][j]);
    }
  }
});
