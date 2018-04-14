module.exports = {
  PORT: process.env.PORT || 5000,
  LUIS: {
    APPID: process.env.LUIS_APP_ID || "81076113-ac04-41e0-85f9-d47ed8cc3522",
    APPSECRET: process.env.LUIS_APP_SECRET || "9b9a2e025a5c458bb1a477816916e023"
  },
  SMOOCH: {
    APPID: process.env.SMOOCH_APP_ID || "5ad178eee33dc000225ade7b",
    KEYID: process.env.SMOOCH_KEY_ID || "app_5ad17ba1c43d14002222359b",
    SECRET: process.env.SMOOCH_SECRET || "PRpr6uE2VjFpflghsskBsZg4"
  }
}
