import c3 from 'c3';

class Vis {
  constructor($el) {
    this.$el = $el;
    this.initPlot();
  }

  initPlot() {
    console.log('start init plot', this.$el);

    this.chart = c3.generate({
        bindto: '#chart', //this.$el,
        data: {
          columns: [
            []
          ]
        }
    });
    console.log('end init plot');
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

export { Vis };
