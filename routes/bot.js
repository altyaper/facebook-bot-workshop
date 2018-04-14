const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.post('/message', (req, res) => {
  console.log("something llego");
  console.log(req.body);
  res.sendStatus(203);

});

module.exports = router;
