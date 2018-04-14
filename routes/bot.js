const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.post('/message', (req, res) => {
  // TODO: INTEGRATE LUIS AI
  res.sendStatus(203);

});

module.exports = router;
