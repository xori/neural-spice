var globals = require('./config.js');
var N = require('./lib/NeuralNetwork.js');
var GA = require('./lib/GA.js');

var _n = new N.Net();
console.log(_n);


//TODO Setup GA environment
var population = Array();
var ga = new GA(globals, population);
//TODO Randomize initial population

//FOR g in GENERATIONS
//	DONE generate fitness
//	DONE select winners
//		if not last generation
//  DONE breed winners

