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

router.post('/webhook', (req, res) => {
  let data = req.body;
  console.log(data);
  res.sendStatus(200);
});


module.exports = router;
