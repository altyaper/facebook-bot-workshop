module.exports = {
  PORT: process.env.PORT || 3000,
  LUIS: {
    APPID: process.env.LUIS_APP_ID || "replace_here",
    APPSECRET: process.env.LUIS_APP_SECRET || "replace_here"
  },  
  FACEBOOK: {
    VALIDATION_TOKEN: process.env.VALIDATION_TOKEN || 'this_is_my_token_ma_friend'
  }
}
