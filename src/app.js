var globals       = require('./config.js');
var NeuralNetwork = require('./lib/NeuralNetwork.js');

var _n = new NeuralNetwork(5,5);
_n.addLayer(5);
_n.addLayer(5);
console.log(_n);


//TODO Setup GA environment
var population = Array();
//var GA = new GASystem(globals, population);
//TODO Randomize initial population

//FOR g in GENERATIONS
//	TODO generate fitness
//	TODO select winners
//		if not last generation
//  TODO breed winners

