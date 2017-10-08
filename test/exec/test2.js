var dde = require('node-dde');

var timelineplayer = require('timelineplayer');

var log4js = require('log4js');
require('datejs');

var client, clients;
/*
const log = {
  firstLoad: true,
  init: function() {
    if (this.firstLoad) {

      log4js.configure({
        appenders: [{
          "type": "file",
          "category": "system",
          "filename": "logs/system.log",
          "pattern": "-yyyy-MM-dd"
        }]
      });
      this.firstLoad = false;
    }
  },
  get: function() {
    return log4js.getLogger('system');
  }
};
log.firstLoad && log.init();
const logger = log.get();

var client, clients;

var i = 0;
var id = setInterval(function() {
   i++
  //console.log('v8 thread-' + i++)
}, 1000);

(new timelineplayer([

  [1000, function() {

    client = dde.createClient('RSS', '5341.T');

    console.log(client.service());
    console.log(client.topic());
    console.log(client.isConnected());
    console.log(client.isPaused());

    client.connect();

    console.log(client.isConnected());

    client.on('disconnected', function(service, topic, isDisposed, isServerInitiated) {
        
      var txt = 'OnDsconnected: ' + 'Service: ' + service + ', Topic: ' + topic + ', IsDisposed: ' + isDisposed + ', IsServerInitiated: ' + isServerInitiated
      logger.info(txt)
      console.log(txt);
    });

    client.on('advise', function(service, topic, item, text) {
      var txt = 'OnAdvise: ' + 'Service: ' + service + ', Topic: ' + topic + ', Item: ' + item + ', Text: ' + text;
      logger.info(txt)
      console.log(txt);
    });

    client.startAdvise('現在値');
    client.startAdvise('最良買気配値');
    client.startAdvise('最良買気配数量');
    client.startAdvise('最良売気配値');
    client.startAdvise('最良売気配数量');


  }],

  [130000000, function() {


    client.stopAdvise('現在値');

    client.stopAdvise('最良買気配値');
    client.stopAdvise('最良買気配数量');
    client.stopAdvise('最良売気配値');
    client.stopAdvise('最良売気配数量');
    client.dispose();

    clearInterval(id);

  }]
  
], function(p, v) {
  v[1]();
})).play();*/
/*client = dde.createClient('RSS', '5341.T');

client.on('advise', function(service, topic, item, text) {
  console.log('OnAdvise: '
    + 'Service: ' + service
    + ', Topic: ' + topic
    + ', Item: ' + item
    + ', Text: ' + text);
});

client.connect();

client.startAdvise('現在値');
*/
console.log(Date.today().at("11:11:54").getTime())