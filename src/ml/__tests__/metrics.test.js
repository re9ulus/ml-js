import * as Mtr from './../Metrics';

test('MSE different length', () => {
  expect(() => {
    Mtr.meanSquaredError([1], [2, 3])}
  ).toThrow();
});

test('MSE empty', () => {
  expect(Mtr.meanSquaredError([], [])).toEqual(0);
});

test('MSE equal', () => {
  expect(Mtr.meanSquaredError([1, 2, 3], [1, 2, 3])).toEqual(0);
});

test('MSE diff', () => {
  expect(Mtr.meanSquaredError([1, 2, 3], [4, 5, 6])).toEqual(9);
});
