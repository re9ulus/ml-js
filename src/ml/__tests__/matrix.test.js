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
