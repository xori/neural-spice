var globals       = require('./config.js');
var NeuralNetwork = require('./lib/NeuralNetwork.js');

var _n = new NeuralNetwork();
console.log(_n);


//TODO Setup GA environment
var population = Array();
//var GA = new GASystem(globals, population);
//TODO Randomize initial population

//FOR g in GENERATIONS
//	DONE generate fitness
//	DONE select winners
//		if not last generation
//  DONE breed winners

