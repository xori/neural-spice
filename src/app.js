var globals = require('./config.js');
var GA = require('./lib/GA.js');
var Data = require('./lib/Data.js');

var data = Data.loadFile();
console.log(data.length + " rows loaded.");
var ga = new GA(globals, data);
ga.inital();

for(var g = 0; g < globals.generations; g++) {
	ga.tick();
	ga.breed();
}
ga.tick();

return;
ga.breed(5);
ga.tick();
ga.population[0].network.toString();
