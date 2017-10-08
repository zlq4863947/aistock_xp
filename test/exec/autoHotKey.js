
var autoUrl = 'C:/workspace/deploy/8081/aistock_xp/test/exec/test.exe';

const spawn = require('child_process').spawn

console.log('Spawning from:', process.pid)
setTimeout(() => {
	let child = spawn(autoUrl, [
		`node -e "

	  process.on('SIGHUP', () => {console.log('received SIGHUP', process.exit())})

	  setInterval(() => {
	      console.log(process.pid, 'is alive')
	    }, 500);"`
	], {
		stdio: ['inherit', 'inherit', 'inherit']
	})

	child.on('close', () => {
		console.log('caught child\'s exit')
			// exiting here should be unecessary
		process.exit()
	})

	setTimeout(() => {
		// child.kill()
		// child.kill('SIGINT')
		// child.kill('SIGTERM')
		// child.kill('SIGHUP')
		console.log(child.pid)
		process.kill(child.pid + 1, 'SIGHUP')
	}, 2000)
}, 2000)


//var proc = require('child_process').spawn(autoUrl);
//proc.kill('SIGINT');

