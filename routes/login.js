var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
console.log('login 화면호출!');

    var ss = req.session;

    res.render('./login', {'title' : '로그인 화면', 'session' : ss});
});

/* GET home page. */
router.post('/auth',
    passport.authenticate('login', {
        successRedirect: '/index',
        failureRedirect: '/login/fail',
        failureFlash: true })
);

router.get('/fail', function(req, res) {
    console.log('login fail 화면호출!');

    var ss = req.session;

    res.render('./loginFail', {'title' : '로그인 화면', 'session' : ss});
});

module.exports = router;
