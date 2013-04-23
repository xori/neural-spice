var globals = require('./config.js');
var GA = require('./lib/GA.js');
var Data = require('./lib/Data.js');

var population = Array();
var data = Data.loadFile();
console.log(data.length + " rows loaded.");
var ga = new GA(globals, data);
ga.inital();

for(var g = 0; g < 10; g++) {
	ga.tick();
	if(g != 9) {
		ga.breed(5);
	}
}

return;
ga.breed(5);
ga.tick();
ga.population[0].network.toString();
