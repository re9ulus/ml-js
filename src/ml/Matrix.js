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

function mul(A, B) {
  return numeric.mul(A, B);
}

function div(A, B) {
  return numeric.div(A, B);
}

function pow(A, B) {
  return numeric.pow(A, B);
}

export { dot, add, sub, mul, div, pow };
