//GLOBALS
var globals = {
  verbose : false,
  generations : 100,
  population : 100,
  mutation  : 0.2,
  crossover  : 0.8,
  tournament_size: 50,
  data_size : 1000, //max 18000 for connect4, 6497 for wines
  data_type : "wines",
  random    : function(){ return(2*Math.random() - 1); },
  tanh      : function(x){ return( (Math.exp(2*x)-1) / (Math.exp(2*x)+1) ); },
  siggy     : function(x){ return( 1 / (Math.exp(-x) + 1) ); }
};

module.exports = globals;
