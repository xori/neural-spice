//GLOBALS
var globals = {
	generations : 1000,
	population : 50,
	mutation	: 0.2,
	crossover	: 0.8,
	tournament_size: 7,
	//whatever	
  random    : function(){ return(2*Math.random() - 1); },
  tanh      : function(x){ return( (Math.exp(2*x)-1) / (Math.exp(2*x)+1) ); }
};

module.exports = globals;
