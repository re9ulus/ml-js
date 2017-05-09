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


test('Dib constants', () => {
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
