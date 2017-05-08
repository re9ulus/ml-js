import React, { Component } from 'react';
import logo from './logo.svg';

import * as Tests from './ml/test';

class App extends Component {

  testPlot() {
    Tests.testPlotLinearRegression();
  }

  test() {
    // Tests.testSimpleLinearRegression();
    // Tests.testLinearRegression();
    Tests.testSimpleLogisticRegression();
    Tests.testLogisticRegression();
  }

  render() {

    this.test();

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div id="test-items">
          <textarea id="target" rows="4" cols="50"></textarea>
          <textarea id="data" rows="4" cols="50"></textarea>
          <div id="chart"></div>
          <button onClick={() => this.testPlot()}>
            Cool sutff
          </button>
        </div>
      </div>
    );
  }
}

export default App;
