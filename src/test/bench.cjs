const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('Search algorithms benchmark');
const App1 = '../algo-1/App.js';
const App2 = '../algo-2/App.js';
const recipes = '../../../data/recipes';
const query = 'coco';

suite
  .add('Algo 1', function() {
    import(App1).then(module => {
      const _app = new module.App(recipes);
      _app.main();
      document.getElementById('main-search-input').value = query;
    });
  })
  .add('Algo 2', function() {
    import(App2).then(module => {
      const _app = new module.App(recipes);
      _app.main();
      document.getElementById('main-search-input').value = query;
    });
  })
  .on('start', function() {
    console.log('Test suite started');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
    console.log(event);
  })
  .on('complete', function() {
    console.log('Test completed');
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
