//GLOBALS
var globals = {
	generations : 1000,
	mutation	: 0.1,
	crossover	: 0.9,
	//whatever	
  random    : function(){ return(2*Math.random() - 1); }
};

module.exports = globals;
