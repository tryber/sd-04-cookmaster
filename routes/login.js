const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/signup', (_req, res) => {
  res.render('signup');
});

module.exports = router;
