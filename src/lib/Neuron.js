var Synapse = require('./Synapse.js');

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
    this.cin.push(new Synapse(list[i],this,Math.random()));
} //Neuron()

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
Neuron.prototype.fire = function(){
	if (this.fired)
		return(this.output); //if we have already fired this run, just return

	this.output = 0; //otherwise, we need to calculate our output
	for (var i = 0; i < this.cin.length; i++)
		this.output += this.cin[i].from.fire() * this.cin[i].weight;

	this.output = (Math.exp(2*this.output) - 1) / (Math.exp(2*this.output) + 1); // = tanh(output)
	this.fired = true;     //don't do the math again if called again this epoch
	return(this.output);
} //Neuron.fire()

module.exports = Neuron;
