import { SimpleLinearRegression, LinearRegression} from './../LinearRegression';
import { SimpleLogisticRegression, LogisticRegression } from './../LogisticRegression';
import { testData, testDataArr, testLogisticData } from  './../TestData';
import { meanSquaredError, logLoss, accuracy } from './../Metrics';
import { Scaler } from './../Scaler';


function prepareData(inputData, standardize=false) {
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
  return [ data, label ];
}

test('Test SimpleLinearRegression', () => {
  let lr = new SimpleLinearRegression();
  const eta = 0.01;
  let [data, label] = prepareData(testData, true);
  lr.fit(data, label, eta);
  const pred = lr.predict(data);
  const error = meanSquaredError(label, pred);
  expect(error).toBeCloseTo(0.01617);
});

test('Test LinearRegression', () => {
  let lr = new LinearRegression();
  const eta = 0.01;
  let [data, label] = prepareData(testDataArr, true);
  lr.fit(data, label, eta);
  const pred = lr.predict(data);
  const error = meanSquaredError(label, pred);
  expect(error).toBeCloseTo(0.01617);
});

test('Test SimpleLogisticRegression', () => {
  let logReg = new SimpleLogisticRegression();
  const eta = 0.01;
  let [data, label] = prepareData(testLogisticData, false);
  logReg.fit(data, label, eta);
  const prob = logReg.predictProba(data);
  const pred = logReg.predict(data);
  const loss = logLoss(label, prob);
  const acc = accuracy(label, pred);
  expect(loss).toBeCloseTo(0.1828);
  expect(acc).toBeCloseTo(1);
});

test('Test LogisticRegression', () => {
  let logReg = new LogisticRegression();
  const eta = 0.01;
  let [data, label] = prepareData(testLogisticData, false);
  logReg.fit(data, label, eta);
  const prob = logReg.predictProba(data);
  const pred = logReg.predict(data);
  const loss = logLoss(label, prob);
  const acc = accuracy(label, pred);
  expect(loss).toBeCloseTo(0.1828);
  expect(acc).toBeCloseTo(1);
});
