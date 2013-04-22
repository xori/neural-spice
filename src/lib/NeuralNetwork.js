
var g = require('../config.js');

var NUM_IN = 42;
var NUM_OUT = 3;
var MAX_IN_LYR = 50;
var MAX_NUM_LYR = 3;
var TOTAL_NEURONS = NUM_IN+NUM_OUT + MAX_NUM_LYR*MAX_IN_LYR;

var INPUT_START  = 0;
var INPUT_END    = INPUT_START+NUM_IN;
var H1_START     = INPUT_END;
var H1_END       = H1_START+MAX_IN_LYR;
var H2_START     = H1_END;
var H2_END       = H2_START+MAX_IN_LYR;
var H3_START     = H2_END;
var H3_END       = H3_START+MAX_IN_LYR;
var OUTPUT_START = H3_END;
var OUTPUT_END   = OUTPUT_START+NUM_OUT;

/**
 * NeuralNetwork
 * A full network.
**/
function NeuralNetwork(){
  /**
   * matrix is an adjacentcy list representing the network
   * the value at matrix[i][j] is the weight of the synapse connecting
   * neuron i to neuron j.
   * Inherently, all neurons in the network always exist, it's just some
   * are not connected at all.
   * When looping, always go i = 0 -> TOTAL_NEURONS then j = i+1 -> TOTAL_NEURONS
   * This prevents cycles in the network, and actually saves some ram.
  **/
  this.matrix = new Array();
  for (var i = 0; i < TOTAL_NEURONS; i++){
    this.matrix[i] = new Array();
    for (var j = i+1; j < TOTAL_NEURONS; j++)
      this.matrix[i][j] = 0;
  }
  //connect input layer to output layer by default
  for (var i = INPUT_START; i < INPUT_END; i++)
    for (var j = OUTPUT_START; j < OUTPUT_END; j++)
      this.matrix[i][j] = g.random();

  /**
   * fires keeps the state of the network at an epoch.
   * hasFired becomes true if we have already calculated a neurons output,
   * in which case the value of that neurons output is `output`
  **/
  this.fires = new Array();
  for (var i = 0; i < TOTAL_NEURONS; i++)
    this.fires[i] = { hasFired : true , output : 0 };
} //NeuralNetwork()


/**
 * NeuralNetwork.fire(neuron#)
 * Calculates the output of neuron number sent. Will recurse back to dependant
 * neurons, so it only needs to be called on the neurons in the output layer.
 * Recursion stops at the input layer, since fires[].hasFired will always
 * be true there.
**/
NeuralNetwork.prototype.fire = function(neuron){
  if (this.fires[neuron].hasFired)
    return(this.fires[neuron].output);  //already calculated, return it

  for (var i = 0; i < neuron; i++)
    this.fires[neuron].output += this.matrix[i][neuron] * this.fire(i);
  this.fires[neuron].output = g.tanh(this.fires[neuron].output);
  this.fires[neuron].hasFired = true;
  return(this.fires[neuron].output);
} //NeuralNetwork.fire(neuron)


/**
 * NeuralNetwork.forwardProp(Data)
 * Performs the forward prop of the network using the given data.
**/
NeuralNetwork.prototype.forwardProp = function(data){
  //set up the input layer
  for (var i = INPUT_START; i < INPUT_END; i++)
    this.fires[i].output = data.input[i]; //never set hasFired to false
  //reset all other neurons fires values
  for (var i = INPUT_END; i < TOTAL_NEURONS; i++){
    this.fires[i].hasFired = false;
    this.fires[i].output = 0;
  }

  //perform the forward prop
  for (var i = OUTPUT_START; i < OUTPUT_END; i++)
    this.fire(i);
} //NeuralNetwork.forwardProp(Data)


/**
 * NeuralNetwork.test(Data)
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


NeuralNetwork.prototype.toString = function(){
  /*
    I   H   H   H   O       show each neuron as # links in/out
    N   I   I   I   U
    P   D   D   D   T
    U   D   D   D   P
    T   E   E   E   U
        N   N   N   T
  */
  var inputs = new Array();  var outputs = new Array();
  var hidden1 = new Array(); var hidden2 = new Array(); var hidden3 = new Array();
  for (var i = 0; i < 50; i++){
    hidden1[i] = new Object(); hidden2[i] = new Object(); hidden3[i] = new Object();
    hidden1[i].ins = hidden1[i].outs = hidden2[i].ins = hidden2[i].outs = hidden3[i].ins = hidden3[i].outs = 0;
    if (i < INPUT_END){
      inputs[i] = new Object();
      inputs[i].ins = inputs[i].outs = 0;
    }
    if (i < 3){
      outputs[i] = new Object();
      outputs[i].ins = outputs[i].outs = 0;
    }
  }

  var pos = 0;
  for (; pos < INPUT_END; pos++){
    for (var i = 0; i < TOTAL_NEURONS; i++){
      if (this.matrix[pos][i]){ inputs[pos].outs++; }
      if (this.matrix[i][pos]){ inputs[pos].ins++; }
    }
  }

  for (var i = OUTPUT_START, pos = 0; i < OUTPUT_END; i++, pos++){
    for (var j = 0; j < TOTAL_NEURONS; j++){
      if (this.matrix[i][j]){ outputs[pos].outs++; }
      if (this.matrix[j][i]){ outputs[pos].ins++; }
    }
  }

  for (var i = H1_START, pos = 0; i < H1_END; i++, pos++){
    var p1 = i; var p2 = i+MAX_IN_LYR; var p3 = i+2*MAX_IN_LYR;
    for (var j = 0; j < TOTAL_NEURONS; j++){
      if (this.matrix[p1][j]){ hidden1[pos].outs++; }
      if (this.matrix[j][p1]){ hidden1[pos].ins++; }
      if (this.matrix[p2][j]){ hidden2[pos].outs++; }
      if (this.matrix[j][p2]){ hidden2[pos].ins++; }
      if (this.matrix[p3][j]){ hidden3[pos].outs++; }
      if (this.matrix[j][p3]){ hidden3[pos].ins++; }
    }
  }
  
  
  for (var i = 0; i < MAX_IN_LYR; i++){
    var str = "";
    if (i > 3 && i < 46)
      str += "("+inputs[i-4].ins+","+inputs[i-4].outs+")";
    str += "\t";
    str += "("+l(hidden1[i].ins)+","+l(hidden1[i].outs)+")  ";
    str += "("+l(hidden2[i].ins)+","+l(hidden2[i].outs)+")  ";
    str += "("+l(hidden3[i].ins)+","+l(hidden3[i].outs)+")  ";
    if (i > 24 && i < 28)
      str += "("+outputs[i-25].ins+","+outputs[i-25].outs+")";
    console.log(str);
  }

} //NeuralNetwork.toString()

/**
 * Private Function:
 * Add leading spaces to numbers, turning '(3,100)' to '(  3,100)' forcing
 * better output.
 **/
function l (obj) {
  var leading_space = "   ";
  return (leading_space + obj).slice(-leading_space.length);
} // leading spaces

module.exports = {
  Net           : NeuralNetwork,
  INPUT_START   : INPUT_START,
  INPUT_END     : INPUT_END,
  H1_START      : H1_START,
  H1_END        : H1_END,
  H2_START      : H2_START,
  H2_END        : H2_END,
  H3_START      : H3_START,
  H3_END        : H3_END,
  OUTPUT_START  : OUTPUT_START,
  OUTPUT_END    : OUTPUT_END,
  TOTAL_NEURONS : TOTAL_NEURONS
};
