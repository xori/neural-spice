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

module.exports = Chromosome;
