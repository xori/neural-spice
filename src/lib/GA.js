
var NeuralNetwork = require('./NeuralNetwork.js');
var Chromosome = require('./Chromosome.js');

function GA (_config, _data, _population) {
  this.config = _config;
  this.population = _population || new Array();
  this.data = _data;
}

/**
 * Inital function should generate the starting population. In
 * this implementation it uses the mutate function of a chromo-
 * some to generate
 */
GA.prototype.inital = function(popsize_override) {
  var pop_size = popsize_override || this.config.population;
  var network;
  
  if(this.config.verbose) console.time("Generate Inital Pop");
  for(var p = 0; p < pop_size; p++) {
    network = new Chromosome();
    for(var i = 0; i < 50; i++) {
      network.mutate();
    }
    this.population.push(network);
  }
  if(this.config.verbose) console.timeEnd("Generate Inital Pop");
  this.tick(0);
}

/**
 * Perform one generation. This includes finding fitness and
 * sorting the population.
 * @return Sorted population array of Chromosomes
 */
GA.prototype.tick = function(first) {
  first = first || 1;
  for(var indv = 0; indv < this.population.length; indv++) {
    this.population[indv].fitness = 0;
    for(var i = first; i < this.data.length; i++) {
      if(this.population[indv].network.test(this.data[i])) {
        this.population[indv].fitness++;
      }
      //process.stderr.write("\r(I:"+((indv/this.population.length)*100+"").slice(0,2)+"%,D:"+((i/this.data.length)*100+"").slice(0,4)+"%)");
    } //no need to normalize, sweet
  }
  this.population.sort(function(a,b){return b.fitness-a.fitness});
  if(this.config.verbose) 
    console.log("\n"+(this.population[0].fitness/this.data.length+"").slice(0,4));
  return this.population;
}

/**
 * Breeds the best `Config.tournySize` (or `top`) best individuals.
 */
GA.prototype.breed = function(top) {
  top = top || this.config.tournament_size;
  var best = [];
  for(var p = 0; p < top-1; p++)
    best.push(this.population[parseInt(Math.random()*this.population.length)]);
  best.push(this.population[0]);
  var temp;

  for(var i = 1; i < this.population.length; i++) {
    if (Math.random() < this.config.mutate) {
      // Do mutate
      this.population[i] = best[Math.random()*top].mutate()
    } else {
      // Do crossover
      var first, second;
      // Have to make sure first and second isn't the same.
      first = parseInt(Math.random()*top);
      second = parseInt(Math.random()*top);
      while(first == second) {
        second = parseInt(Math.random()*top);
      }
      this.population[i] = best[first].crossover(best[second]);
    }
  }
}

module.exports = GA;
