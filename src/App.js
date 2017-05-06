import React, { Component } from 'react';
import logo from './logo.svg';

import { SimpleLinearRegression } from './ml/LinearRegression';
import { test_data } from  './ml/TestData';
import { meanSquaredError } from './ml/Metrics';
import { Scaler } from './ml/Scaler';

class App extends Component {

  test_func() {
    let lr = new SimpleLinearRegression();
    let data = [];
    let label = [];

    for (let item of test_data) {
      label.push(item[0]);
      data.push(item[1]);
    }

    let scaler = new Scaler();
    label = scaler.standardize(label);
    data = scaler.standardize(data);

    // console.log('label: ', label);
    // console.log('data: ', data);

    const eta = 0.01;
    lr.fit(data, label, eta);

    let pred = lr.predict(data);
    let error = meanSquaredError(label, pred);
    console.log('Error: ', error);
  }

  render() {

    this.test_func();

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
