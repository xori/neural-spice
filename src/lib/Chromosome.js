
var NeuralNetwork = require('./NeuralNetwork.js');
var g             = require('../config.js');

function Chromosome(){

  this.network = new NeuralNetwork.Net();
  this.fitness = 0;

} //Chromosome()

/**
  crossover possibilities
    union & intersection - networks must have same # of hidden layers
**/
Chromosome.prototype.crossover = function(chromo){
  if (Math.random() < 0.5)
    return(union(chromo.network,this.network));
  return(intersect(chromo.network,this.network));
} //Chromosome.crossover(Chromosome)

/**
 * union(NeuralNetwork,NeuralNetwork)
 * Returns a new chromosome whose network is a union of the two networks sent
**/
function union(nn1,nn2){
  var child = new Chromosome();

  for (var i = 0; i < NeuralNetwork.TOTAL_NEURONS; i++)
    for (var j = i+1; j < NeuralNetwork.TOTAL_NEURONS; j++)
      child.network.matrix[i][j] = (nn1.matrix[i][j] + nn2.matrix[i][j])/2;

  return(child);
} //union(NeuralNetwork,NeuralNetwork)

/**
 * intersect(NeuralNetwork,NeuralNetwork)
 * Returns a new chromosome whose network is an intersection of the two networks
**/
function intersect(nn1,nn2){
  var child = new Chromosome();

  for (var i = 0; i < NeuralNetwork.TOTAL_NEURONS; i++)
    for (var j = i+1; j < NeuralNetwork.TOTAL_NEURONS; j++)
      if (nn1.matrix[i][j] && nn2.matrix[i][j])
        child.network.matrix[i][j] = (nn1.matrix[i][j] + nn2.matrix[i][j])/2;
      else
        child.network.matrix[i][j] = 0;

  return(child);
} //intersect(NeuralNetwork,NeuralNetwork)





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
Chromosome.prototype.mutate = function(){
  var val = Math.random();
  add_neuron(this);
} //Chromosome.mutate()


function add_neuron(chromo){
  //TODO scan for a zero'd out column in chromo.network.matrix, column #i
  //if found, randomly populate that column i and row i with values
  //if not found, delete a random non-output node by zeroning out the col/row <- remove_neuron
} //add_neuron(Chromosome)

module.exports = Chromosome;
