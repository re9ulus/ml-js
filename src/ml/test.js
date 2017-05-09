import { SimpleLinearRegression, LinearRegression} from './LinearRegression';
import { SimpleLogisticRegression, LogisticRegression } from './LogisticRegression';
import { testData, testDataArr, testLogisticData } from  './TestData';
import { meanSquaredError, logLoss, accuracy } from './Metrics';
import { Scaler } from './Scaler';
import { Vis } from './../vis/Vis';

// ToDo: Implement generalized test
function modelTest(model, inputData) {

}

function testSimpleLinearRegression() {
  let lr = new SimpleLinearRegression();
  let data = [];
  let label = [];

  for (let item of testData) {
    label.push(item[0]);
    data.push(item[1]);
  }

  let scaler = new Scaler();
  label = scaler.standardize(label);
  data = scaler.standardize(data);

  const eta = 0.01;
  lr.fit(data, label, eta);

  let pred = lr.predict(data);
  let error = meanSquaredError(label, pred);
  console.log('Error: ', error);
}


function testLinearRegression() {
  let lr = new LinearRegression();
  let data = [];
  let label = [];

  for (let item of testDataArr) {
    label.push(item[0]);
    data.push(item[1]);
  }

  let scaler = new Scaler();
  label = scaler.standardize(label);
  data = scaler.standardize(data);

  const eta = 0.01;
  let errors = lr.fit(data, label, eta);

  let pred = lr.predict(data);
  let error = meanSquaredError(label, pred);
  console.log('Error: ', error);

  return errors;
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

  const eta = 0.01;
  lr.fit(data, label, eta);
  lr2.fit(data, label, 0.1);
}


function testSimpleLogisticRegression() {
  let logReg = new SimpleLogisticRegression();
  let data = [];
  let label = [];

  for (let item of testLogisticData) {
    label.push(item[0]);
    data.push(item[1]);
  }

  // let scaler = new Scaler();
  // label = scaler.standardize(label);
  // data = scaler.standardize(data);

  const eta = 0.01;
  logReg.fit(data, label, eta);

  let predProbs = logReg.predictProba(data);
  let pred = logReg.predict(data);
  console.log('LogLoss: ', logLoss(label, predProbs));
  console.log('Accuracy: ', accuracy(label, pred));
}


function testLogisticRegression() {
  let logReg = new LogisticRegression();
  let data = [];
  let label = [];

  for (let item of testLogisticData) {
    label.push(item[0]);
    data.push(item[1]);
  }

  // let scaler = new Scaler();
  // label = scaler.standardize(label);
  // data = scaler.standardize(data);

  const eta = 0.01;
  logReg.fit(data, label, eta);

  let predProbs = logReg.predictProba(data);
  let pred = logReg.predict(data);
  console.log('LogLoss: ', logLoss(label, predProbs));
  console.log('Accuacy: ', accuracy(label, pred));
}


export { testSimpleLinearRegression, testLinearRegression,
  testSimpleLogisticRegression, testLogisticRegression, testPlotLinearRegression };
