import c3 from 'c3';

class Vis {
  constructor($el) {
    this.$el = $el;
    console.log(c3);
  }

  scatter(data) {
    console.log('Not implemented');
  }

  line(data) {
    console.log('Plot line');

    let columns = [
        // ['data1', 30, 200, 100, 400, 150, 250],
        // ['data2', 50, 20, 10, 40, 15, 25]
    ];
    if (data) {
      columns.push(['loss'].concat(data));
    }


    /*const chart =*/ c3.generate({
        bindto: '#chart',
        data: {
            columns: columns
        }
    });

  }

}

export { Vis };
