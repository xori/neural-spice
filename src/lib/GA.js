
var NeuralNetwork = require('./NeuralNetwork.js');
var Chromosome = require('./Chromosome.js');
var config;
var population;
var data = new Array();

function GA (_config, _data, _population) {
	config = _config;
  population = _population || new Array();
  data = _data;
}

/**
 *  Inital function should generate the starting population. In 
 * this implementation it uses the mutate function of a chromo-
 * some to generate 
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

/**
 *  Perform one generation. This includes finding fitness and 
 * sorting the population.
 * @return Sorted population array of Chromosomes
 */
GA.prototype.tick() {
  for(var indv = 0; indv < population.length; indv++) {
    population[i].fitness = 0;
    for(var i = 0; i < data; i++) {
      if(population[i].network.test(data[i])) {
        population[i].fitness++;
      }
    }
  }
  population.sort(function(a,b){return a.fitness-b.fitness});
  return population;
}

/**
 * Breeds the best `Config.tournySize` (or `top`) best individuals.
 */
GA.prototype.breed(top) {
  top = top || config.tournament_size;
  var best = population.split(0,top);
  var temp;
  for(int i = 0; i < population; i++) {
    temp = population[Math.random()*top
  }
}









