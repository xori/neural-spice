
var g = require('./config.js');

var NUM_IN = 42;
var NUM_OUT = 3;
var MAX_IN_LYR = 50;
var MAX_NUM_LYR = 3;
var TOTAL_NEURONS = NUM_IN+NUM_OUT + MAX_NUM_LYR*MAX_IN_LYR;

var INPUT_START  = 0;
var INPUT_END    = INPUT_START+NUM_IN;
var OUTPUT_START = INPUT_END;
var OUTPUT_END   = OUTPUT_START+NUM_OUT;
var H1_START     = OUTPUT_END;
var H1_END       = H1_START+MAX_NUM_LYR;
var H2_START     = H1_END;
var H2_END       = H2_START+MAX_NUM_LYR;
var H3_START     = H2_END;
var H3_END       = H3_START+MAX_NUM_LYR;

/**
 * NeuralNetwork
 * A full network.
**/
function NeuralNetwork(){

  this.matrix = new Array();
  for (var i = 0; i < TOTAL_NEURONS; i++){
    this.matrix[i] = new Array();
    for (var j = 0; j < TOTAL_NEURONS; j++)
      this.matrix[i][j] = 0;
  }
  for (var i = INPUT_START; i < INPUT_END; i++)
    for (var j = OUTPUT_START; j < OUTPUT_END; j++)
      this.matrix[i][j] = g.random();

  this.fires = new Array();
  for (var i = 0; i < TOTAL_NEURONS; i++)
    this.fires[i] = 0;

} //NeuralNetwork()


NeuralNetwork.prototype.forwardProp = function(data){
  for (var i = INPUT_START; i < INPUT_END; i++)
    this.fires[i] = data.input[i];
  for (var i = INPUT_END; i < TOTAL_NEURONS; i++)
    this.fires[i] = 0;
} //NeuralNetwork.forwardProp(Data)


NeuralNetwork.prototype.test = function(data){
  this.forwardProp(data);

  var out = new Array();    //output of the network


} //NeuralNetwork.test(Data)

module.exports = NeuralNetwork;
