/**
 * Created by 23tl on 2017/4/16.
 */
import timelineplayer from 'timelineplayer';
import util from '../../../src/app/common/util';

let todoList = [], i = 0;
for(;i<5;i++) {
	todoList.push([1000*(i+1), function() {
		console.log(util.getNowDatetime(),", s",this);
	}.bind(i)]);
}

(new timelineplayer(todoList, function(p, v) {
	v[1]();
})).play(0,2);