var express = require('express');
var router = express.Router();

// Redirect root to the employees list
router.get('/', function(req, res, next) {
  res.redirect('/employees');
});

module.exports = router;
