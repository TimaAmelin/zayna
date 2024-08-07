const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;

const webAppUrl = process.env.NGROK_LINK;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	if (text === '/start') {
		await bot.sendMessage(chatId, 'Переходите в наше приложение', {
			reply_markup: {
				inline_keyboard: [
					[{text: 'Открыть', web_app: {url: webAppUrl}}]
				],
			},
		})
	}
});