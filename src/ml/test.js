import { SimpleLinearRegression, LinearRegression} from './LinearRegression';
import { SimpleLogisticRegression, LogisticRegression } from './LogisticRegression';
import { testData, testDataArr, testLogisticData } from  './TestData';
import { meanSquaredError, logLoss, accuracy } from './Metrics';
import { Scaler } from './Scaler';


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
  testSimpleLogisticRegression, testLogisticRegression };
