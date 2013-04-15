
var NeuralNetwork = require('./NeuralNetwork.js');
var Chromosome = require('./Chromosome.js');
var config;
var population;

function GA (_config, _population) {
	config = _config;
  population = _population;
}

/**
 *  Inital function should generate the starting population. In 
 * this implementation it uses the mutate function of a chromo-
 * some
 */
GA.prototype.inital(popsize_override) {
  var pop_size = popsize_override || config.population;
  var network;
  
  for(var p = 0; p < pop_size; p++) {
    network = new Chromosome();
    for(var i = 0; i < 5; i++) {
      network.mutate();
    }
    population.push(network);
  }
}
