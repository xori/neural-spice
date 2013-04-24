var config = require('../config.js');

/**
 * Private variables
**/
if (config.data_type == "wines"){
  var DATA_NUM_ATTRIBUTES = 11;
  var DATA_NUM_OUTPUTS = 11;
  var DATA_FILE = "../data/wine/wines.data";
}
if (config.data_type == "connect4"){
  var DATA_NUM_ATTRIBUTES = 42;
  var DATA_NUM_OUTPUTS = 3;
  var DATA_WIN_STR  = "win";
  var DATA_LOSS_STR = "loss";
  var DATA_DRAW_STR = "draw";
  var DATA_WIN  = [ 1 , 0, 0];
  var DATA_LOSS = [ 0, 1 , 0];
  var DATA_DRAW = [ 0, 0, 1 ];
  var DATA_WIN_INDEX  = 0;
  var DATA_LOSS_INDEX = 1;
  var DATA_DRAW_INDEX = 2;
  var DATA_FILE = "../data/connect/connect-4.data";
}

var fs = require('fs');
/**
 * Data
 * Represents one piece of data.
 * `row` is one row of the input data file.
**/
function Data(row){
  this.input = row.split(",",DATA_NUM_ATTRIBUTES);
  if (config.data_type == "connect4"){
    for(var i = 0; i < this.input.length; i++) {
      switch(this.input[i]) {
        case 'b': this.input[i] =.2; break;
        case 'x': this.input[i] = 1; break;
        case 'o': this.input[i] = 0; break;
        default: this.input.splice(i,1);
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
  }
  if (config.data_type == "wines"){
    for (var i = 0; i < this.input.length; i++)
      this.input[i] = parseFloat(this.input[i]);
    this.idx = parseInt(row.substr(row.lastIndexOf(",")+1));
    this.output = new Array();
    for (var i = 0; i < DATA_NUM_OUTPUTS; i++)
      this.output[i] = 0;
    this.output[this.idx] = 1;
  }
  // console.log(this);
} //Data()


function Load_File(_filename) {
  var filename = _filename || DATA_FILE
  //console.time(filename);
  var data = fs.readFileSync(filename).toString();
  var rows = data.split('\n');
  for(var i = 0; i < rows.length; i++) {
    rows[i] = new Data(rows[i]);
  }

  for (var i = rows.length-1; i > 0; i--){
    var j = Math.floor(Math.random() * (i+1));
    var t = rows[i];
    rows[j] = rows[i];
    rows[j] = t;
  }

  var ret = new Array();
  var pos = 0, i = 0; var win = 0, lose = 0, draw = 0;
  var max = config.data_size; var single = max / 3;

  if (config.data_type == "connect4"){
    while (pos < max){
      if (win < single && rows[i].idx == DATA_WIN_INDEX){
        win++;
        ret[pos++] = rows[i];
      }
      else if (lose < single && rows[i].idx == DATA_LOSS_INDEX){
        lose++;
        ret[pos++] = rows[i];
      }
      else if (draw < single && rows[i].idx == DATA_DRAW_INDEX){
        draw++;
        ret[pos++] = rows[i];
      }
      i++;
    }
  }
  if (config.data_type == "wines"){
    while (pos < max){
      ret[pos++] = rows[i];
      i++;
    }
  }

  //console.timeEnd(filename);
  return ret;//rows;
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
