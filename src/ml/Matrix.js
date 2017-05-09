import numeric from 'numeric';
// import vectorious from 'vectorious'

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

function dot(A, B) {
  return numeric.dot(A, B);
}

function pow(A, B) {
  return numeric.pow(A, B)
}

function exp(A) {
  return numeric.exp(A);
}

function neg(A) {
  return numeric.neg(A);
}

function sigmoid(A) {
  return div(1, add(1, exp(neg(A))));
}

export { dot, add, sub, mul, div, pow, exp, neg, sigmoid };
