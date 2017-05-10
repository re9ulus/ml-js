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


test('Accuracy different length', () => {
  expect(() => {
    Mtr.accuracy([1], [2, 3])}
  ).toThrow();
});

test('Accuracy empty', () => {
  expect(Mtr.accuracy([], [])).toEqual(1);
});

test('Accuracy equal', () => {
  expect(Mtr.accuracy([1, 0, 1], [1, 0, 1])).toEqual(1);
});

test('Accuracy diff', () => {
  expect(Mtr.accuracy([1, 1, 1], [0, 0, 0])).toEqual(0);
  expect(Mtr.accuracy([1, 1, 0, 0], [1, 0, 1, 0])).toEqual(0.5);
});
