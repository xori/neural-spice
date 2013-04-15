
var g = require('./config.js');

var NUM_IN = 42;
var NUM_OUT = 3;
var MAX_IN_LYR = 50;
var MAX_NUM_LYR = 3;
var TOTAL_NEURONS = NUM_IN+NUM_OUT + MAX_NUM_LYR*MAX_IN_LYR;

var INPUT_START  = 0;
var INPUT_END    = INPUT_START+NUM_IN;
var H1_START     = INPUT_END;
var H1_END       = H1_START+MAX_NUM_LYR;
var H2_START     = H1_END;
var H2_END       = H2_START+MAX_NUM_LYR;
var H3_START     = H2_END;
var H3_END       = H3_START+MAX_NUM_LYR;
var OUTPUT_START = H3_END;
var OUTPUT_END   = OUTPUT_START+NUM_OUT;

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


/**
 * fire(neuron#)
 * Calculates the output of neuron number sent. Will recurse back to dependant
 * neurons, so it only needs to be called on the neurons in the output layer.
 * Recursion stops at the input layer, since fires[] will be set at that point.
**/
NeuralNetwork.prototype.fire = function(neuron){
  if (this.fired[neuron])
    return(this.fired[neuron]); //already calculated, return it

  for (var i = 0; i < neuron; i++)
    this.fires[neuron] += this.matrix[neuron][i] * this.fire(i);
  this.fires[neuron] = tanh(this.fires[neuron]);  //squashy squashy
  return(this.fires[neuron]);
} //NeuralNetwork.fire(neuron)

/**
 * forwardProp(data)
 * Performs the forward prop of the network using the given data.
**/
NeuralNetwork.prototype.forwardProp = function(data){
  var i,j;
  //set up the input layer
  for (i = INPUT_START; i < INPUT_END; i++)
    this.fires[i] = data.input[i];
  //reset all neurons fired values
  for (i = INPUT_END; i < TOTAL_NEURONS; i++)
    this.fires[i] = 0;

  for (i = OUTPUT_END-1; i >= OUTPUT_START; i--)
    this.fire(i);
} //NeuralNetwork.forwardProp(Data)

/**
 * test(data)
 * Runs the example through the network, returns true if the output
 * was the expected value according to the data.
**/
NeuralNetwork.prototype.test = function(data){
  this.forwardProp(data);
  var max = -1;
  var idx = 0;
  for (var i = OUTPUT_START; i < OUTPUT_END; i++)
    if (max < this.fires[i]){
      max = this.fires[i];
      idx = i;
    }
  return(data.idx == idx);
} //NeuralNetwork.test(Data)

module.exports = NeuralNetwork;
