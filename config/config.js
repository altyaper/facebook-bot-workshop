module.exports = {
  PORT: process.env.PORT || 5000,
  LUIS: {
    APPID: process.env.LUIS_APP_ID || "",
    APPSECRET: process.env.LUIS_APP_SECRET || ""
  },
  SMOOCH: {
    APPID: process.env.SMOOCH_APP_ID || "",
    KEYID: process.env.SMOOCH_KEY_ID || "",
    SECRET: process.env.SMOOCH_SECRET || ""
  }
}
