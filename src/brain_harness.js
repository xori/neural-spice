var brain = require('brain');
var Data = require('./lib/Data.js');

var data = Data.loadFile();
var test_data = Data.loadFile();
var net = new brain.NeuralNetwork({
  hiddenLayers : [ 30 ]
});

console.log(JSON.stringify(require('./config.js')));
console.log("Iteration, Training Error, Correct Rate");
net.train(data,{
  errorThresh: 0,
  iterations: 1000,
  callback: test_brain,
  callbackPeriod: 10
});


function test_brain(state){
  var rate = 0;
  for (var i = 0; i < test_data.length; i++){
    var output = net.run(test_data[i].input);
    var max = -1, idx = -1;
    for (var j = 0; j < output.length; j++){
      if (max < output[j]){
        max = output[j];
        idx = j;
      }
    }
    if (idx == data[i].idx)
      rate++;
  }
  console.log(state.iterations+", "+state.error+", "+(rate/test_data.length));
}
