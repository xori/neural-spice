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
var DATA_FILE = "../data/connect/connect-4.data";

var fs = require('fs');
/**
 * Data
 * Represents one piece of data.
 * `row` is one row of the input data file.
**/
function Data(row){
  this.input = row.split(",",DATA_NUM_ATTRIBUTES);
  for(var i = 0; i < this.input.length; i++) {
    switch(this.input[i]) {
      case 'b': this.input[i] = 0; break;
      case 'x': this.input[i] = 1; break;
      case 'o': this.input[i] =-1; break;
      default: this.input.splice(i,1);
    }
  var input = row.split(",",DATA_NUM_ATTRIBUTES);
  for (var i = 0; i < input.length; i++){
    switch(input[i]) {
      case 'b': input[i] = 0; break;
      case 'x': input[i] = 1; break;
      case 'o': input[i] =-1; break;
    };
  }
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


function Load_File(_filename) {
  var filename = _filename || DATA_FILE;
  console.log(filename);
  var data = fs.readFileSync(filename).toString();
  var rows = data.split('\n');
  for(var i = 0; i < rows.length; i++) {
    rows[i] = new Data(rows[i]);
  }
  return rows;
} //Load_File()

module.exports = {
  Row: Data,
  loadFile : Load_File,
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
