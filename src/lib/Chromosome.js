
var DataVars = requrie('./Data.js');
var NUM_ATT  = DataVars.DATA_NUM_ATTRIBUTES;
var NUM_OUT  = DataVars.DATA_NUM_OUTPUTS;

function Chromosome(){

  this.network = new NeuralNetwork(NUM_ATT,NUM_OUT);

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
  this.mutate = function(){
  } //Chromosome.mutate()
} //Chromosome()

/**
  crossover possibilities
    union & intersection - networks must have same # of hidden layers
**/
Chromosome.prototype.crossover = function(nn){
  if (Math.random() < 0.5)
    return(union(nn,this.network));
  return(intersect(nn,this.network));
} //Chromosome.crossover()

/**
 * union(NeuralNetwork,NeuralNetwork)
 * Returns a new chromosome whose network is a union of the two networks sent
**/
function union(nn1,nn2){
  var child = new Chromosome();

  

  return(child);
} //union(NeuralNetwork,NeuralNetwork)

/**
 * intersect(NeuralNetwork,NeuralNetwork)
 * Returns a new chromosome whose network is an intersection of the two networks
**/
function intersect(nn1,nn2){
  var child = new Chromosome();
  return(child);
} //intersect(NeuralNetwork,NeuralNetwork)

module.exports = Chromosome;
