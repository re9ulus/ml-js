import React, { Component } from 'react';
import logo from './logo.svg';

import { Vis } from './vis/Vis';
import { testLinearRegression, testSimpleLinearRegression, testSimpleLogisticRegression } from './ml/test';

class App extends Component {

  testPlot() {
    let errors = testLinearRegression();
    let vis = new Vis();
    vis.line(errors);
  }

  test() {
    testSimpleLogisticRegression();
    // testLinearRegression();
    // testSimpleLinearRegression();
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
        <div id="chart"></div>
        <button onClick={() => this.testPlot()}>
          Cool sutff
        </button>

      </div>
    );
  }
}

export default App;
