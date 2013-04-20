var globals = require('./config.js');
var N = require('./lib/NeuralNetwork.js');
var GA = require('./lib/GA.js');
var Chromosome = require('./lib/Chromosome.js');

var net = new N.Net();
var chromo = new Chromosome();
for (var i = 0; i < 50; i++)
  chromo.mutate();
chromo.network.toString();
//console.log(chromo.network.matrix[43]);
return;


//TODO Setup GA environment
var population = Array();
var ga = new GA(globals, population);
//TODO Randomize initial population
ga.inital();

ga.tick();

ga.breed(5);
//FOR g in GENERATIONS
//	DONE generate fitness
//	DONE select winners
//		if not last generation
//  DONE breed winners

