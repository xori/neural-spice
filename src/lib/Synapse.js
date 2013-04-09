/**
 * Synapse
 * A connection between two Neurons.
**/
function Synapse(_to,_from,_weight){
  this.to     = _to;
  this.from   = _from;    //synapse connects neuron `from` to neuron `to`
  this.weight = _weight;  //obviously the weight of this connection
} //Synapse()

module.exports = Synapse;
