import { SimpleLinearRegression, LinearRegression} from './LinearRegression';
import { SimpleLogisticRegression, LogisticRegression } from './LogisticRegression';
import { testData, testDataArr, testLogisticData } from  './TestData';
import { meanSquaredError, logLoss, accuracy } from './Metrics';
import { Scaler } from './Scaler';
import { Vis } from './../vis/Vis';

// ToDo: Implement generalized test
function modelTest(model, inputData, callback, eta=0.01, standardize=false) {
  let data = [];
  let label = [];
  for (let item of inputData) {
    label.push(item[0]);
    data.push(item[1]);
  }
  if (standardize) {
    let scaler = new Scaler();
    label = scaler.standardize(label);
    data = scaler.standardize(data);
  }
  model.fit(data, label, eta);
  callback(data, label, model);
}

function _regressionCallback(data, label, model) {
  const pred = model.predict(data);
  const error = meanSquaredError(label, pred);
  console.log('MSE: ', error);
}

function _clfCallback(data, label, model) {
  let predProbs = model.predictProba(data);
  let pred = model.predict(data);
  console.log('LogLoss: ', logLoss(label, predProbs));
  console.log('Accuracy: ', accuracy(label, pred));
}

function testSimpleLinearRegression() {
  let lr = new SimpleLinearRegression();
  modelTest(lr, testData, _regressionCallback, 0.01, true);
}

function testLinearRegression() {
  let lr = new LinearRegression((data, target, bias, weights) =>
    console.log('loss', meanSquaredError(target, lr._predict(data, bias, weights))));
  modelTest(lr, testDataArr, _regressionCallback, 0.01, true);
}

function testSimpleLogisticRegression() {
  let logReg = new SimpleLogisticRegression();
  modelTest(logReg, testLogisticData, _clfCallback, 0.01, false);
}


function testLogisticRegression() {
  let logReg = new LogisticRegression((data, target, bias, weights) =>
    console.log('loss', logLoss(target, logReg._predictProba(data, bias, weights))));
  modelTest(logReg, testLogisticData, _clfCallback, 0.01, false);
}


function testPlotLinearRegression() {
  // ToDo: Plot in separate thread
  let vis = new Vis('chart');

  const lineHandler1 = vis.line([], 'lr1', '#faa');
  let ind = 0;
  let lr = new LinearRegression((data, target, bias, weights) => {
    const loss = meanSquaredError(target, lr._predict(data, bias, weights));
    vis.addPoint(ind, loss, lineHandler1);
    ind += 1;
    console.log('loss', loss);
  });

  const lineHandler2 = vis.line([], 'lr2', '#afa');
  let ind2 = 0;
  let lr2 = new LinearRegression((data, target, bias, weights) => {
    const loss = meanSquaredError(target, lr._predict(data, bias, weights));
    vis.addPoint(ind2, loss, lineHandler2);
    ind2 += 1;
    console.log('loss', loss);
  });

  let data = [];
  let label = [];

  for (let item of testDataArr) {
    label.push(item[0]);
    data.push(item[1]);
  }

  let scaler = new Scaler();
  label = scaler.standardize(label);
  data = scaler.standardize(data);

  lr.fit(data, label, 0.01);
  lr2.fit(data, label, 0.001);
}


export { testSimpleLinearRegression, testLinearRegression,
  testSimpleLogisticRegression, testLogisticRegression, testPlotLinearRegression };
