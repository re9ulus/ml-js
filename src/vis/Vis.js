import c3 from 'c3';
import Chart from 'chart.js'


class VisC3 {
  constructor($el) {
    this.$el = $el;
    this.initPlot();
  }

  initPlot() {
    this.chart = c3.generate({
        bindto: this.$el,
        data: {
          columns: [
            []
          ]
        }
    });
    console.log('end init plot');
  }

  addPoint(val) {
    throw new Error("Add point in not supported with c3.js backend.");
  }

  scatter(data, title) {
    let columns = [];
    if (title && data) {
      columns = [title].concat(data);
    } else {
      throw new Error('Can not plot scatter. Title or Data is empty.')
    }
    this.chart.load({columns:[columns], type: 'scatter'});
  }

  line(data, title) {
    let columns = [];
    if (title && data) {
      columns = [title].concat(data);
    } else {
      throw new Error('Can not plot line. Title or Data is empty.')
    }
    this.chart.load({columns:[columns]});
  }
}


class VisChartJS {
  constructor($el) {
    this.$el = $el;
    this.initPlot();
  }

  initPlot() {
    this.ctx = document.getElementById(this.$el);
    this.config = {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    };

    this.chart = new Chart(this.ctx, this.config);
    console.log('end init plot');
  }

  addPoint(x, y, handler=0) {
    this.config.data.datasets[handler].data.push({x: x, y: y});
    this.chart.update();
  }

  scatter(data, title) {
    console.log('Not implemented');
    throw new Error('Scatter not implemented');
  }

  line(data, title, color='#afa') {
    console.log('Not implemented');
    this.chart.data.datasets.push({
      label: title,
      fill: false,
      borderColor: color,
      data: data
    });
    const handler = this.chart.data.datasets.length - 1;
    this.chart.update();
    return handler;
  }
}


const Vis = VisChartJS;

export { Vis };
