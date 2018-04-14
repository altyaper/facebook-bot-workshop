const express = require('express');
const router = express.Router();
const config = require('../config/config');
const LUISClient = require("luis-node-sdk");
const Smooch = require('smooch-core');

// Smooch
const smooch = new Smooch({
  keyId: config.SMOOCH.KEYID,
  secret: config.SMOOCH.SECRET,
  scope: 'app'
});

// Luis
let LUISclient = LUISClient({
  appId: config.LUIS.APPID,
  appKey: config.LUIS.APPSECRET,
  verbose: true
});

router.post('/message', (req, res) => {
  const appUserId = req.body.appUser._id;
  const text = req.body.messages[0].text;

  console.log(text);

  LUISclient.predict(text, {
    //On success of prediction
    onSuccess: function (response) {
      console.log(response.topScoringIntent.intent);
      switch (response.topScoringIntent.intent) {
        case "Greet":
          smooch.appUsers.sendMessage(appUserId, {
            type: 'text',
            text: "Hola, me llamo Bot Viajero y puedo ayudarte a planear tus proximas vacaciones",
            role: 'appMaker'
          }).then(response => {
            res.end();
          }).catch(err => {
            console.log(err);
            res.end();
          });
          break;
        default:
          smooch.appUsers.sendMessage(appUserId, {
            type: 'text',
            text: "Me gustaria ser humano para poder entenderte, intenta ser mas especifico",
            role: 'appMaker'
          }).then(response => {
            res.end();
          }).catch(err => {
            res.end();
          });
      }
    },
    //On failure of prediction
    onFailure: function (err) {
      console.error(err);
    }
  });
  res.sendStatus(203);

});

module.exports = router;
