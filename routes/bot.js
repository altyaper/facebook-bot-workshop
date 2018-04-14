const express = require('express');
const router = express.Router();
const config = require('../config/config');
const LUISClient = require("luis-node-sdk");
const Smooch = require('smooch-core');
const smooch = new Smooch({
  keyId: config.SMOOCH.KEYID,
  secret: config.SMOOCH.SECRET,
  scope: 'app'
});

let LUIS = LUISClient({
  appId: config.LUIS.APPID,
  appKey: config.LUIS.APPSECRET,
  verbose: true
});

let appUserId;

router.post('/message', (req, res) => {
  appUserId = req.body.appUser._id;
  const text = req.body.messages[0].text;

  console.log('Received message was:', text);

  LUIS.predict(text, {
    onSuccess: (response) => successPredict(response, res),
    onFailure: (response) => failurePredict(response, res)
  });

  res.sendStatus(203);

});

function failurePredict(err, res) {
  console.error(err);
  res.sendStatus(500);
}

function successPredict(response, res) {
  const topIntent = response.topScoringIntent.intent;
  switch (topIntent) {
    case "Greet":
    smooch.appUsers.sendMessage(appUserId, {
      type: 'text',
      text: "Hola, me llamo fabulaRobot soy un robot que necesita entrenamiento.",
      role: 'appMaker'
    }).then(response => {
      console.log('response', response);
      res.end();
    }).catch(err => {
      console.log(err);
      res.end();
    });
    break;
    case "farewell":
      smooch.appUsers.sendMessage(appUserId, {
        type: 'text',
        text: "¡Fue un placer platicar contigo, adiós!",
        role: 'appMaker'
      }).then(response => {
        console.log('response', response);
        res.end();
      }).catch(err => {
        console.log(err);
        res.end();
      });
      break;
    default:
      smooch.appUsers.sendMessage(appUserId, {
        type: 'text',
        text: "Me gustaría ser humano para poder entenderte, intenta ser más específico",
        role: 'appMaker'
      }).then(response => {
        res.end();
      }).catch(err => {
        console.log("error", err);
        res.end();
      });
  }
}

module.exports = router;
