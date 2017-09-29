var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ss = req.session;

  if(ss.usrid == null) {
    res.redirect('/login');
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
