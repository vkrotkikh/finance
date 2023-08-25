require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_PWD = process.env.MONGODB_PWD
const MONGODB_LOGIN = process.env.MONGODB_LOGIN
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

module.exports = {
  MONGODB_URI,
  PORT,
  MONGODB_PWD,
  MONGODB_LOGIN,
  TELEGRAM_TOKEN
}