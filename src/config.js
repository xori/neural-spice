//GLOBALS
var globals = {
	generations : 100,
	population : 50,
	mutation	: 0.2,
	crossover	: 0.8,
	tournament_size: 10,
	data_size : 6000,
	//whatever	
  random    : function(){ return(2*Math.random() - 1); },
  tanh      : function(x){ return( (Math.exp(2*x)-1) / (Math.exp(2*x)+1) ); },
  siggy     : function(x){ return( 1 / (Math.exp(-x) + 1) ); }
};

module.exports = globals;
