var Neuron = require('./Neuron.js');

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
    this.input[i] = new Neuron(0);
  for (var i = 0; i < numOut; i++)
    this.output[i] = new Neuron(100,this.input);

  /**
   * NeuralNetwork.addLayer(len,pos)
   * Adds a new hidden layer to the network.
  **/
  this.addLayer = function(len,pos){
    pos = pos || this.size-1;
    var layer = Array();
    if (this.hidden.length)
      for (var i = 0; i < len; i++)
        layer.push(new Neuron(pos,this.hidden[this.hidden.length-1]));
    else
      for (var i = 0; i < len; i++)
        layer.push(new Neuron(pos,this.input));
    this.hidden.push(layer);
    this.size++;
  } //NeuralNetwork.addLayer(len,pos)

  /**
   * NeuralNetwork.test(data)
   * Does the forward prop and returns true if the output obtained was correct.
  **/
  this.test = function(data){
    //set up the input layer
    for (var i = 0; i < this.input.length; i++)
      this.input[i].output = data.input[i];  //never change `fired` to false

    //reset the hidden layers so they refire this epoch
    for (var i = 0; i < this.hidden.length; i++)
      for (var j = 0; j < this.hidden[i].length; j++)
        this.hidden[i][j].fired = false;

    var out = Array();  //the output values
    var max = -10;      //the highest output of the network range [-1..1]
    var idx = -1;       //index of highest output
    for (var i = 0; i < this.output.length; i++){
      this.output[i].fired = false;    //reset output layer
      out[i] = this.output[i].fire();  //and acquire all of the outputs
      if (max < out[i]){
        max = out[i];
        idx = i;
      }
    }

    return(data.idx == idx);
  } //NeuralNetwork.test()
} //NeuralNetwork()

module.exports = NeuralNetwork;
