import dde from 'node-dde';
import timelineplayer from 'timelineplayer';
import util from '../common/util';
import store from '../store/mysql';

class MockDdeServer {
  constructor(code, date, speed) {
    this.service = 'T_RSS';

    if (code.indexOf('.T') == -1) code += '.T';
    this.code = code;
    this.topic = {};
    this.topic[this.code] = null;
    this.date = date;

    this.server = dde.createServer(this.service);
    this.server.register();
    this.speed = speed || 1;
    console.log(this)
  }

  start() {
    if (!this.topic[this.code] || this.topic[this.code].length == 0) {
      store.select('dde', {
        topic: this.code,
        date: '2017-04-20'
      }, (data) => {
        // DB有数据时
        if (data && data.length != 0) {
          this.topic[this.code] = data;
          this.playTime(this.topic[this.code]);
        }
      });
    } else {
      this.playTime(this.topic[this.code]);
    }
  }

  stop() {
    this.server.disconnect();
    this.server.unregister();
    this.server.dispose();
  }

  playTime(data) {
    let i = 0,
      timeLine = 0,
      todoList = [];
    for (; i < data.length; i++) {

      if (i > 0) {
        // 前一条数据的unix时间戳（精度毫秒）
        let perTime = Date.today().at(data[i - 1].time.split('.')[0])
          .addMilliseconds(data[i - 1].time.split('.')[1]).getTime(),
          // 当前条数据的unix时间戳（精度毫秒）
          time = Date.today().at(data[i].time.split('.')[0])
          .addMilliseconds(data[i].time.split('.')[1]).getTime();

        // 时间线数据设置
        timeLine += time - perTime;
      }
      todoList.push([timeLine, function() {
        console.log(this.data.date, this.data.time, ", ", this.timeLine, "ms", this.data.item, this.data.text);
        this.mockServ.server.advise('5341.T', this.data.item, this.data.text);
        this.mockServ.server.onAdvise = function() {
          console.log('send advise:', this);
          return this.text;
        }.bind(this.data);
      }.bind({
        mockServ: this,
        timeLine: timeLine,
        data: data[i]
      })]);
    }

    (new timelineplayer(todoList, function(p, v) {
      v[1]();
    })).play(0, this.speed);
  }
}

export default MockDdeServer;