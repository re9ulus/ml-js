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

function mul(A, val) {
  return numeric.mul(A, val);
}

export { dot, add, sub, mul };
