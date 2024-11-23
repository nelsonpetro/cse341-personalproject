const router = require('express').Router();

router.get('/', (req, res) => {
  //#swagger.tags=['Hello world']
  res.send('Hello world');
});

router.use('/graphics', require('./graphicCards')).use('/', require('./swagger'));

module.exports = router;
