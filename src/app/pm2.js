var child = require('child_process').exec(`babel-node ./src/bin/www`);
child.stdout.on('data', function(data) {
	console.log(data.toString());
});