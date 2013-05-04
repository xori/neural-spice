var fs = require('fs');
var processed = 0;

// arg[0] = 'node'
// arg[1] = 'filename'
var folder = process.argv[2];
if (folder == undefined) {
	process.stderr.write("Must define a folder of csv files as arg.\n");
	process.exit(1);
}

// Because the first two lines of the csv's is the config dump and the
// titles of the columns by default this will skip the first 2 lines.
// 	To enable ALL LINE parsing, add ALLLINES to the end of the command.
var SKIP_AMOUNT = 2;
if (process.argv[3] == "ALLLINES"){
	SKIP_AMOUNT = 0;
}

// gens = Array of {average, worst, best} averaged across all generations.
var gens = [];
var file_list = fs.readdirSync(folder);
	process.stderr.write("Found "+file_list.length+" files.\n");

file_list.forEach(function (file, file_index) {
	// Yay for single thread, don't have to worry about race conditions =D
	fs.readFile(folder +"/"+ file, function (err, data) {
		if(err) throw err;
		data = (""+data).split("\n");
		data.forEach(function (line, line_index) {
			if(line_index < SKIP_AMOUNT) return; // continue
			// Uses regular expression to strip spaces.
			var values   = (line+"").replace(/ /g,'').split(",");
			if(values.length != 3) {
				//process.stderr.write("Got unexpected length: `"+line+"`");
				return;
			}
			var temp_row = gens[line_index-SKIP_AMOUNT];
			// Make sure `gens` is initilized.
			if(temp_row === undefined) {
				gens[line_index-SKIP_AMOUNT] = { average:0, error:0/*, worst:0, best:0 */};
				temp_row = gens[line_index-SKIP_AMOUNT];
			}
			temp_row.average  += parseFloat(values[2]);
      temp_row.error    += parseFloat(values[1]);
			//if (parseFloat(values[1]) > temp_row.best)
			//	temp_row.best  = parseFloat(values[1]);
			//if (parseFloat(values[3]) < temp_row.worst)
			//	temp_row.worst = parseFloat(values[3]);
		});
		output();
	});
});

// so much for no race conditions
function output () {
	if (++processed < file_list.length){
		return; // still more jobs todo.
	}
		// DO OUTPUT
		var s/*eparater*/ = ", ";
		console.log("Iteration, Correct Rate, Training Error");
		gens.forEach(function (gen, index) {
			gen.average /= file_list.length;
			gen.error /= file_list.length;
			console.log((index*10) +s+ gen.average +s+ gen.error /*+s+ gen.worst*/);
		});
};
