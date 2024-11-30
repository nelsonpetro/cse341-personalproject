const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/graphics', require('./graphicCards'));


router.get('/login', passport.authenticate('github')
  //#swagger.tags=['Auth']
);


router.get('/logout', function(req, res, next) {
  //#swagger.tags=['Auth']
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
