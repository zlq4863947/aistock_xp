var dde = require('node-dde');

var clients = dde.createClients({
	'RSS': {
		'5341.T': ['現在値', '銘柄名称'],
		'6502.T': ['現在値', '銘柄名称']
	}
}, 'shift_jis'); //shift_jis
console.log(clients.service());
console.log(clients.topic());
console.log(clients.isConnected());
console.log(clients.isPaused());

clients.connect();

console.log(clients.isConnected());

clients.on('disconnected', function(service, topic, isDisposed, isServerInitiated) {
	console.log('Service: ' + service + ', Topic: ' + topic + ', IsDisposed: ' + isDisposed + ', IsServerInitiated: ' + isServerInitiated);
});

clients.on('advise', function(service, topic, item, text) {
	console.log('Service: ' + service + ', Topic: ' + topic + ', Item: ' + item + ', Text: ' + text);
});

clients.startAdvise(1, true, 60000);