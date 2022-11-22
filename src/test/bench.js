const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('Search algorithms benchmark');
const { Algo1 } = require('../algo-1/js/App.js');
const { Algo2 } = require('../algo-2/js/App.js');
const query = 'coco';

suite
  .add('Algo 1 - Array functions', function() {
    Algo1(query);
  })
  .add('Algo 2 - Classic custom functions', function() {
    Algo2(query);
  })
  .on('start', function() {
    console.log('Test suite started');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Test completed');
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
