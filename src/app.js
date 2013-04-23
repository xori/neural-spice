var globals = require('./config.js');
var GA = require('./lib/GA.js');
var Data = require('./lib/Data.js');
var population = new Array();
var best, worst, average = 0;

// Dump Settings
console.log(JSON.stringify(globals));
console.log("Best, Average, Worst");

// Load Data File
var data = Data.loadFile();
if(globals.verbose) console.log(data.length + " rows loaded.");

// Setup GA
var ga = new GA(globals, data);
ga.inital();

for(var g = 0; g < globals.generations; g++) {
  population = ga.tick();
  
  // Do statistics
  for(var i = 0, average = 0; i < population.length; i++)
    average += population[i].fitness;
  average = average / (population.length * data.length);
  worst = population.slice(-1)[0].fitness  / data.length;
  best  = population[0].fitness / data.length;
  console.log(best+", "+average+", "+worst);

  // Perform mutation/crossover
  ga.breed();
}
ga.tick();

return;
ga.population[0].network.toString();
