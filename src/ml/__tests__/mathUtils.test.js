import * as Mth from './../MathUtils';

test('Mean empty', () => {
  expect(Mth.mean([])).toEqual(0);
});

test('Mean one value', () => {
  expect(Mth.mean([3])).toEqual(3);
});

test('Mean array', () => {
  expect(Mth.mean([1, 2, 3, 4])).toEqual(2.5);
})


test('MatrixMeanCols empty 1', () => {
  expect(() => {
    Mth.matrixMeanCols([]);
  }).toThrow();
});

test('MatrixMeanCols empty 2', () => {
  expect(() => {
    Mth.matrixMeanCols([[]]);
  }).toThrow();
});

test('MatrixMeanCols row', () => {
  expect(Mth.matrixMeanCols([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
});

test('MatrixMeanCols matrix', () => {
  expect(Mth.matrixMeanCols([[1, 2, 3, 4], [5, 6, 7, 8]])).toEqual([3, 4, 5, 6]);
});


function _sigmoid(val) {
  return 1.0 / (1.0 + Math.exp(-val));
}

test('Sigmoid', () => {
  expect(Mth.sigmoid(0)).toEqual(_sigmoid(0));
  expect(Mth.sigmoid(-3)).toEqual(_sigmoid(-3));
  expect(Mth.sigmoid(5)).toEqual(_sigmoid(5));
});


test('Clip empty', () => {
    expect(Mth.clip([], 0, 1)).toEqual([]);
});

test('Clip array', () => {
    expect(Mth.clip([1, 2, 3, 4], 2, 3)).toEqual([2, 2, 3, 3]);
});
