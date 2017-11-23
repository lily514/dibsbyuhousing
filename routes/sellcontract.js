var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('in sell contract.js')
  res.render('sellcontract', { title: 'Express' });
});

module.exports = router;