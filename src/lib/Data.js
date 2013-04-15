/**
 * Private variables
**/
var DATA_NUM_ATTRIBUTES = 42;
var DATA_NUM_OUTPUTS = 3;
var DATA_WIN_STR  = "win";
var DATA_LOSS_STR = "loss";
var DATA_DRAW_STR = "draw";
var DATA_WIN  = [ 1 , -1, -1];
var DATA_LOSS = [ -1, 1 , -1];
var DATA_DRAW = [ -1, -1, 1 ];
var DATA_WIN_INDEX  = 0;
var DATA_LOSS_INDEX = 1;
var DATA_DRAW_INDEX = 2;

/**
 * Data
 * Represents one piece of data.
 * `row` is one row of the input data file.
**/
function Data(row){
  this.input = row.split(",",DATA_NUM_ATTRIBUTES);
  this.output = row.substr(row.lastIndexOf(",")+1); //extracts win/loss/draw
  this.idx;   //index of the `1` in the output array
  if (this.output == DATA_WIN_STR){
    this.output = DATA_WIN;
    this.idx = DATA_WIN_INDEX;
  }
  else if (this.output == DATA_LOSS_STR){
    this.output = DATA_LOSS;
    this.idx = DATA_LOSS_INDEX;
  }
  else if (this.output == DATA_DRAW_STR){
    this.output = DATA_DRAW;
    this.idx = DATA_DRAW_INDEX;
  }
} //Data()

module.exports = {
  row: Data,
  DATA_NUM_ATTRIBUTES : DATA_NUM_ATTRIBUTES,
  DATA_NUM_OUTPUTS : DATA_NUM_OUTPUTS,
  DATA_WIN_STR : DATA_WIN_STR,
  DATA_LOSS_STR : DATA_LOSS_STR,
  DATA_DRAW_STR : DATA_DRAW_STR,
  DATA_WIN : DATA_WIN,
  DATA_LOSS : DATA_LOSS,
  DATA_DRAW : DATA_DRAW,
  DATA_WIN_INDEX : DATA_WIN_INDEX,
  DATA_LOSS_INDEX : DATA_LOSS_INDEX,
  DATA_DRAW_INDEX : DATA_DRAW_INDEX
};



