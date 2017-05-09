import * as M from './../Matrix';

test('Add constants', () => {
  expect(M.add(3, 5)).toEqual(8);
});

test('Add constant and vector', () => {
    expect(M.add([3], 5)).toEqual([8]);
    expect(M.add(3, [5])).toEqual([8]);
    expect(M.add(3, [5, 4, 3])).toEqual([8, 7, 6]);
    expect(M.add([[1], [2], [3]], 1)).toEqual([[2], [3], [4]]);
});

test('Add constant and matrix', () => {
    expect(M.add([[1, 2], [3, 4]], 1)).toEqual([[2, 3], [4, 5]]);
    expect(M.add(1, [[1, 2], [3, 4]])).toEqual([[2, 3], [4, 5]]);
});

test('Add vectors', () => {
  expect(M.add([1, 2], [3, 4])).toEqual([4, 6]);
  expect(M.add([[1], [2]], [[3], [4]])).toEqual([[4], [6]]);
});

test('Add matrices', () => {
  expect(M.add([[1, 2], [3, 4]], [[1, 0], [0, 1]])).toEqual([[2, 2], [3, 5]]);
});


test('Sub constants', () => {
  expect(M.sub(3, 5)).toEqual(-2);
});

test('Sub constant and vector', () => {
    expect(M.sub([3], 5)).toEqual([-2]);
    expect(M.sub(3, [5])).toEqual([-2]);
    expect(M.sub(3, [5, 4, 3])).toEqual([-2, -1, 0]);
    expect(M.sub([[1], [2], [3]], 1)).toEqual([[0], [1], [2]]);
});

test('Sub constant and matrix', () => {
    expect(M.sub([[1, 2], [3, 4]], 1)).toEqual([[0, 1], [2, 3]]);
    expect(M.sub(1, [[1, 2], [3, 4]])).toEqual([[0, -1], [-2, -3]]);
});

test('Sub vectors', () => {
  expect(M.sub([1, 2], [3, 4])).toEqual([-2, -2]);
  expect(M.sub([[1], [2]], [[3], [4]])).toEqual([[-2], [-2]]);
});

test('Sub matrices', () => {
  expect(M.sub([[1, 2], [3, 4]], [[1, 0], [0, 1]])).toEqual([[0, 2], [3, 3]]);
});


test('Mul constants', () => {
  expect(M.mul(3, 5)).toEqual(15);
});

test('Mul constant and vector', () => {
    expect(M.mul([3], 5)).toEqual([15]);
    expect(M.mul(3, [5])).toEqual([15]);
    expect(M.mul(3, [5, 4, 3])).toEqual([15, 12, 9]);
    expect(M.mul([[1], [2], [3]], 1)).toEqual([[1], [2], [3]]);
});

test('Mul constant and matrix', () => {
    expect(M.mul([[1, 2], [3, 4]], 1)).toEqual([[1, 2], [3, 4]]);
    expect(M.mul(1, [[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
});

test('Sub vectors', () => {
  expect(M.mul([1, 2], [3, 4])).toEqual([3, 8]);
  expect(M.mul([[1], [2]], [[3], [4]])).toEqual([[3], [8]]);
});

test('Sub matrices', () => {
  expect(M.mul([[1, 2], [3, 4]], [[1, 0], [0, 1]])).toEqual([[1, 0], [0, 4]]);
});


test('Div constants', () => {
  expect(M.div(6, 3)).toEqual(2);
});

test('Div constant and vector', () => {
    expect(M.div([6], 3)).toEqual([2]);
    expect(M.div(9, [3])).toEqual([3]);
    expect(M.div(10, [10, 5, 2])).toEqual([1, 2, 5]);
    expect(M.div([[10], [15], [20]], 5)).toEqual([[2], [3], [4]]);
});

test('Div constant and matrix', () => {
    expect(M.div([[1, 2], [3, 4]], 1)).toEqual([[1, 2], [3, 4]]);
    expect(M.div(8, [[1, 2], [4, 8]])).toEqual([[8, 4], [2, 1]]);
});

test('Div vectors', () => {
  expect(M.div([10, 8], [5, 4])).toEqual([2, 2]);
  expect(M.div([[10], [8]], [[5], [4]])).toEqual([[2], [2]]);
});

test('Div matrices', () => {
  expect(M.div([[4, 6], [8, 10]], [[2, 2], [2, 2]])).toEqual([[2, 3], [4, 5]]);
});


test('Dot constants', () => {
  expect(M.dot(6, 3)).toEqual(18);
});

test('Dot and vector', () => {
  expect(M.dot(6, [3])).toEqual([18]);
  expect(M.dot([6], 3)).toEqual([18]);
});

test('Dot vecotrs', () => {
  expect(M.dot([6], [3])).toEqual(18);
  expect(M.dot([1, 2], [3, 4])).toEqual(11);
  expect(M.dot([1, 2], [[3], [4]])).toEqual([11]);
  // fix behaviour for wrong vector dimensions (col dot row)
  expect(M.dot([[1], [2]], [3, 4])).toEqual([3 ,6]);
});

test('Dot matrix and vector', () => {
  expect(M.dot([[1, 2], [3, 4]], [[1], [2]])).toEqual([[5], [11]]);
  expect(M.dot([1, 2], [[1, 2], [3, 4]])).toEqual([7, 10]);
});

test('Dot matrices', () => {
  expect(M.dot([[1, 2], [3, 4]], [[1, 0], [0, 1]])).toEqual([[1, 2], [3, 4]]);
  expect(M.dot([[1, 2], [3, 4]], [[4, 3], [2, 1]])).toEqual([[8, 5], [20, 13]]);
});


test('Pow constants', () => {
  // Pow doesn't work for constants, use Math.pow
});

test('Pow constant and vector', () => {
    expect(M.pow([2], 3)).toEqual([8]);
    expect(M.pow(2, [3])).toEqual([8]);
    expect(M.pow(2, [2, 3, 4])).toEqual([4, 8, 16]);
    expect(M.pow([[2], [3], [4]], 2)).toEqual([[4], [9], [16]]);
});

test('Pow constant and matrix', () => {
    expect(M.pow([[1, 2], [3, 4]], 2)).toEqual([[1, 4], [9, 16]]);
    expect(M.pow(2, [[1, 2], [3, 4]])).toEqual([[2, 4], [8, 16]]);
});

test('Pow vectors', () => {
  expect(M.pow([2, 3], [2, 3])).toEqual([4, 27]);
  expect(M.pow([[2], [3]], [[2], [3]])).toEqual([[4], [27]]);
});

test('Pow matrices', () => {
  expect(M.pow([[1, 2], [3, 4]], [[2, 2], [2, 2]])).toEqual([[1, 4], [9, 16]]);
});


test('Exp constants', () => {
  // Exp is not defined for constants, use Math.exp
});

test('Exp vector', () => {
    expect(M.exp([2])).toEqual([Math.exp(2)]);
    expect(M.exp([1, 2])).toEqual([Math.exp(1), Math.exp(2)]);
    expect(M.exp([[1], [2]])).toEqual([[Math.exp(1)], [Math.exp(2)]]);
});

test('Exp matrix', () => {
  expect(M.exp([[1, 2], [3, 4]])).toEqual([
    [Math.exp(1), Math.exp(2)], [Math.exp(3), Math.exp(4)]]);
});


test('Neg constants', () => {
  // Exp is not defined for constants, use Math.exp
  expect(M.neg(2)).toEqual(-3);
});

test('Neg vector', () => {
    expect(M.neg([2])).toEqual([-2]);
    expect(M.neg([1, 2])).toEqual([-1, -2]);
    expect(M.neg([[1], [2]])).toEqual([[-1], [-2]]);
});

test('Neg matrix', () => {
  expect(M.neg([[1, 2], [3, 4]])).toEqual([[-1, -2], [-3, -4]]);
});
