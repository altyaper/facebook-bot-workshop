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

  function failurePredict(err, res) {
    console.error(err);
    res.sendStatus(500);
  }

  function successPredict(response, res) {
    const { intent } = response.topScoringIntent;
    const messageCreator = (text) => ({ type: 'text', text, role: 'appMaker'});

    const greetText = "Hola, mi nombre es Fábula, soy una robot que necesita entrenamiento.";
    const farewellText = "¡Fue un placer platicar contigo, adiós!.";
    const noneText = "Me gustaría ser humano para poder entenderte, intenta ser más específico.";
    const infoText = "Del 14 de abril al 28 de mayo, tendremos funciones los jueves a las 8pm, a un costo de 200 pesos";

    switch (intent) {
      case "Saludo":
        smooch.appUsers.sendMessage(appUserId, messageCreator(greetText))
          .then(response => res.end())
          .catch(err => res.end());
        break;
      case "Despedida":
        smooch.appUsers.sendMessage(appUserId, messageCreator(farewellText))
          .then(response => res.end())
          .catch(err => res.end());
        break;
      case "Eventos":
        smooch.appUsers.sendMessage(appUserId, messageCreator(infoText))
          .then(response => res.end())
          .catch(err => res.end());
      default:
        smooch.appUsers.sendMessage(appUserId, messageCreator(noneText))
          .then(response => res.end())
          .catch(err => res.end());
    }
  }
});

module.exports = router;
