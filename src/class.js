/**
 * class.js
 * COSC 4P80 Project
 * Taras Mychaskiw  4105797
 * Evan Verworn     4582938
 * Contains class definitions.
**/

function Synapse(_to,_from,_weight){
  this.to     = _to;
  this.from   = _from;    //synapse connects neuron `from` to neuron `to`
  this.weight = _weight;  //obviously the weight of this conntection
} //Synapse()


function Neuron(lyr,list){
  list = list || Array();

  this.cin = Array();     //list of connections into this neuron
  this.output;            //output at one epoch
  this.fired = false;     //if this neuron has fired this epoch
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

    //otherwise, we need to calculate our output
    output = 0;
    for (var i = 0; i < cin.length; i++)
      output += cin[i].from.fire() * cin[i].weight;

    output = (Math.exp(2*output) - 1) / (Math.exp(2*output) + 1); //tanh
    fired = true;       //don't do the math again if called again this epoch
    return(output);
  } //Neuron.fire()
} //Neuron()


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
  } //NeuralNetwork.test()
} //NeuralNetwork()



function Chromosome(){
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

