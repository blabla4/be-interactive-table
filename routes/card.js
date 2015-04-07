var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  io.emit('card', {'x': req.param('x'), 'y': req.param('y')});
  res.status(200).end();
});

module.exports = router;
