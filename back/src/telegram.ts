import { createProductFromTelegram } from './controllers/ProductController';
import { getUserIdbyTelegramName } from './controllers/UserController';
import { telegramData } from './types';

const config = require('./utils/config');
const TelegramBot = require('node-telegram-bot-api');
const token = config.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg:any) => {
    const chatId = msg.chat.id;
    const userName = msg.chat.username
    const userId = await getUserIdbyTelegramName(userName)

    const productsList:telegramData = {
      name: msg.text,
      userId
    }
    const response = await createProductFromTelegram(productsList);
    bot.sendMessage(chatId, response);
});
