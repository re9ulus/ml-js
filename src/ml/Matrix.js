import numeric from 'numeric';
// import vectorious from 'vectorious'

function dot(A, B) {
  return numeric.dot(A, B);
}

function add(A, B) {
  return numeric.add(A, B);
}

function sub(A, B) {
  return numeric.sub(A, B);
}

export { dot, add, numeric };
