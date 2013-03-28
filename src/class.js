/**
 * class.js
 * COSC 4P80 Project
 * Taras Mychaskiw  4105797
 * Evan Verworn     4582938
 * Contains class definitions.
**/

var DATA_NUM_ATTRIBUTES = 42;
var DATA_NUM_OUTPUTS = 3;
var DATA_WIN_STR  = "win";
var DATA_LOSS_STR = "loss";
var DATA_DRAW_STR = "draw";
var DATA_WIN  = [ 1 , -1, -1];
var DATA_LOSS = [ -1, 1 , -1];
var DATA_DRAW = [ -1, -1, 1 ];
var DATA_WIN_INDEX  = 0;
var DATA_LOSS_INDEX = 1;
var DATA_DRAW_INDEX = 2;

/**
 * Data
 * Represents one piece of data.
 * `row` is one row of the input data file.
**/
function Data(row){
  this.input = row.split(",",DATA_NUM_ATTRIBUTES);
  this.output = row.substr(row.lastIndexOf(",")+1); //extracts win/loss/draw
  this.idx;   //index of the `1` in the output array
  if (this.output == DATA_WIN_STR){
    this.output = DATA_WIN;
    this.idx = DATA_WIN_INDEX;
  }
  else if (this.output == DATA_LOSS_STR){
    this.output = DATA_LOSS;
    this.idx = DATA_LOSS_INDEX;
  }
  else if (this.output == DATA_DRAW_STR){
    this.output = DATA_DRAW;
    this.idx = DATA_DRAW_INDEX;
  }
} //Data()


/**
 * Synapse
 * A connection between two Neurons.
**/
function Synapse(_to,_from,_weight){
  this.to     = _to;
  this.from   = _from;    //synapse connects neuron `from` to neuron `to`
  this.weight = _weight;  //obviously the weight of this conntection
} //Synapse()


/**
 * Neuron
 * Basic worker in the neural network.
 * Each neuron knows only about it's connections in, as we don't care
 * about backpropogating at all.
**/
function Neuron(lyr,list){
  list = list || Array(); //list is all the neurons this guy is connected to

  this.cin = Array();     //list of connections into this neuron
  this.output;            //output at one epoch
  this.fired = true;      //if this neuron has fired this epoch
  this.layer = lyr;       //which layer this neuron is in...

  for (var i = 0; i < list.length; i++)
    cin.push(new Synapse(list[i],this,Math.random()));

  /**
   * Neuron.fire()
   * Sums the inputs and throws the result into some activation function.
   * Basic formula: for each Synapse into this neuron, get the input
   * neuron's output and multiply that by the Synapse weight. Throw that
   * sum into some activation function, and return the squashed value.
   *
   * The way this is written, it is possible to just call 'fire()' on output
   * neurons only. Neuron.fire() will recurse back as through all the layers.
  **/
  this.fire = function(){
    if (fired)
      return(output); //if we have already fired this run, just return

    output = 0; //otherwise, we need to calculate our output
    for (var i = 0; i < cin.length; i++)
      output += cin[i].from.fire() * cin[i].weight;

    output = (Math.exp(2*output) - 1) / (Math.exp(2*output) + 1); // = tanh(output)
    fired = true;     //don't do the math again if called again this epoch
    return(output);
  } //Neuron.fire()
} //Neuron()

/**
 * NeuralNetwork
 * A full network.
**/
function NeuralNetwork(numIn, numOut){

  this.input  = Array();  //input layer
  this.output = Array();  //output layer
  this.hidden = Array();  //all the hidden layers, 2d array
  this.web    = Array();  //synaptic matrix
  this.size   = 2;        //number of layers in the network

  for (var i = 0; i < numIn; i++)
    input[i] = new Neuron(0);
  for (var i = 0; i < numOut; i++)
    output[i] = new Neuron(100,input);

  /**
   * NeuralNetwork.addLayer(len,pos)
   * Adds a new hidden layer to the network.
  **/
  this.addLayer = function(len,pos){
    pos = pos || size-1;
    var layer = Array();
    for (var i = 0; i < len; i++)
      layer.push(new Neuron(pos));
    hidden.push(layer);
    size++;
  } //NeuralNetwork.addLayer(len,pos)

  /**
   * NeuralNetwork.test(data)
   * Does the forward prop and returns true if the output obtained was correct.
  **/
  this.test = function(data){
    //set up the input layer
    for (var i = 0; i < input.length; i++)
      input[i].output = data.input[i];  //never change `fired` to false

    //reset the hidden layers so they refire this epoch
    for (var i = 0; i < hidden.length; i++)
      for (var j = 0; j < hidden[i].length; j++)
        hidden[i][j].fired = false;

    var out = Array();  //the output values
    var max = -10;      //the highest output of the network range [-1..1]
    var idx = -1;       //index of highest output
    for (var i = 0; i < output.length; i++){
      output[i].fired = false;    //reset output layer
      out[i] = output[i].fire();  //and acquire all of the outputs
      if (max < out[i]){
        max = out[i];
        idx = i;
      }
    }

    return(data.idx == idx);
  } //NeuralNetwork.test()
} //NeuralNetwork()



function Chromosome(){
  /**
    crossover possibilities
      union & intersection - networks must have same # of hidden layers
  **/

  /**
    mutation possibilities
      add/remove a synapse
      create new neuron, randomly connect to neurons in previous layers
      kill neuron
      change where a synapse points to
      change synaptic weight
      merge neurons
      merge chains of singly connected hidden neurons
  **/
} //Chromosome()
