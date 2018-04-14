const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FACEBOOK.VALIDATION_TOKEN) {
   res.status(200).send(req.query['hub.challenge']);
  } else {
   res.sendStatus(403);
  }
});


module.exports = router;
