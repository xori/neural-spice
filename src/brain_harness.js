var brain = require('brain');
var Data = require('./lib/Data.js');

var data = Data.loadFile();
var net = new brain.NeuralNetwork();

net.train(data,{
  errorThresh: 0.004,
  iterations: 1000,
  log: true,
  logPeriod: 25
});

data = Data.loadFile();
var rate = 0;
for (var i = 0; i < data.length; i++){
  var output = net.run(data[i].input);
  var max = -1, idx = 0;
  for (var j = 0; j < output.length; j++){
    if (max < output[i]){
      max = output[i];
      idx = i;
    }
  }
  if (idx == data[i].idx)
    rate++;
}
console.log("correct "+(rate/data.length)+"%");

