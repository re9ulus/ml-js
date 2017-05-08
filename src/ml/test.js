import { SimpleLinearRegression, LinearRegression} from './LinearRegression';
import { SimpleLogisticRegression } from './LogisticRegression';
import { testData, testDataArr, testLogisticData } from  './TestData';
import { meanSquaredError, logLoss } from './Metrics';
import { Scaler } from './Scaler';

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

  let predProbs = logReg.predict(data);
  let error = logLoss(label, predProbs);
  console.log('LogLoss: ', error);
}

export { testSimpleLinearRegression, testLinearRegression, testSimpleLogisticRegression };
