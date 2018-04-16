const express = require('express');
const router = express.Router();
const config = require('../config/config');
const LUISClient = require("luis-node-sdk");
const Smooch = require('smooch-core');

const greetText = "Hola, mi nombre es Fábula, soy una robot que necesita entrenamiento.";
const farewellText = "¡Fue un placer platicar contigo, adiós!.";
const noneText = "Me gustaría ser humano para poder entenderte, intenta ser más específico.";
const infoText = "Del 14 de abril al 28 de mayo, tendremos funciones los jueves a las 8pm, a un costo de 200 pesos";

const smooch = new Smooch({
  keyId: config.SMOOCH.KEYID,
  secret: config.SMOOCH.SECRET,
  scope: 'app'
});

const LUIS = LUISClient({
  appId: config.LUIS.APPID,
  appKey: config.LUIS.APPSECRET,
  verbose: true
});

let appUserId;

router.post('/message', (req, res) => {
  appUserId = req.body.appUser._id;
  const { text } = req.body.messages[0];

  console.log('Received message was:', text);

  LUIS.predict(text, {
    onSuccess: (data) => successPredict(data, res),
    onFailure: (data) => failurePredict(data, res)
  });
});

function failurePredict(err, res) {
  console.error(err);
  res.sendStatus(500);
}

function successPredict(data, res) {
  const { intent } = data.topScoringIntent;
  console.log('Top intent:', intent);
  console.log('Whole response:', data);
  console.log('Top scoring:', data.topScoringIntent);

  const sendMessage = (text) => (
    smooch.appUsers.sendMessage(appUserId, { type: 'text', text, role: 'appMaker' })
      .then(response => res.end())
      .catch(err => res.end())
  );

  switch (intent) {
    case "Saludo":
      sendMessage(greetText);
      break;
    case "Despedida":
      sendMessage(farewellText);
      break;
    case "Eventos":
      sendMessage(infoText);
      break;
    default:
      sendMessage(noneText);
  }
}

module.exports = router;
