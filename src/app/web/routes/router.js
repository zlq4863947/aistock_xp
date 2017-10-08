var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('home', {
		title: '趋势观察者'
	});
});

router.get('/tv', function(req, res) {
	res.render('tv', {
		title: '图表'
	});
});

router.get('/ai', function(req, res) {
	res.render('ai', {
		title: '智能机器人'
	});
});

router.get('/wa', function(req, res) {
	res.render('wa');
});


router.get('/main', function(req, res) {
	res.render("main");
});

module.exports = router;