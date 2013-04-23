var brain = require('brain');
var Data = require('./lib/Data.js');

var data = Data.loadFile();
var test_data = Data.loadFile();
var net = new brain.NeuralNetwork({
  hiddenLayers : [ 30 ]
});

net.train(data,{
  errorThresh: 0.004,
  iterations: 1000,
  log: true,
  logPeriod: 10,
  callback: test_brain,
  callbackPeriod: 10
});


function test_brain(error,iterations){
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
  console.log("correct "+(rate/data.length));
}
