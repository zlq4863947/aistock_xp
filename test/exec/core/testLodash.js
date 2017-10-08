import _ from 'lodash';

var users = [{
	'user': 'barney',
	'age': 36
}, {
	'user': 'fred',
	'age': 40
}, {
	'user': 'pebbles',
	'age': 18
}];

var names = _.chain(users).map(function(user) {
	return user.user;
}).value();
console.log(names);