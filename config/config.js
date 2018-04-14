module.exports = {
  PORT: process.env.PORT || 3000,
  LUIS: {
    APPID: process.env.LUIS_APP_ID || "replace_here",
    APPSECRET: process.env.LUIS_APP_SECRET || "replace_here"
  }  
}
