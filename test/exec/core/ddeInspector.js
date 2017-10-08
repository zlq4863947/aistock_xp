/**
 * Created by 23tl on 2017/4/16.
 */
import Intcer from '../../../src/app/core/inspector';
import timelineplayer from 'timelineplayer';

let mock = {
	date: '2017-04-20'
};
mock = null;

const ddeIntcer = new Intcer.DdeInspector(['6502', '6553'], mock, true);

(new timelineplayer([
	[1000, function() {
		ddeIntcer.listen();
	}],
	[1800000000, function() {
		ddeIntcer.stop();
	}]
], function(p, v) {
	v[1]();
})).play();