module.exports = {
  PORT: process.env.PORT || 5000,
  LUIS: {
    APPID: process.env.LUIS_APP_ID || "replace_here",
    APPSECRET: process.env.LUIS_APP_SECRET || "replace_here"
  },
  SMOOCH: {
    APPID: process.env.SMOOCH_APP_ID || "replace_here",
    APPTOKEN: process.env.SMOOCH_APP_TOKEN || "replace_here",
    KEYID: process.env.SMOOCH_KEY_ID || "replace_here",
    SECRET: process.env.SMOOCH_SECRET || "replace_here"
  }
}
