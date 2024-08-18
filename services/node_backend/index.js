const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;

const webAppUrl = process.env.NGROK_LINK;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	if (text === '/start_dev_2416256') {
		await bot.sendMessage(chatId, 'Check out our app in dev mode', {
			reply_markup: {
				inline_keyboard: [
					[
						{	
							text: 'Open',
							web_app: {
								url: `${webAppUrl}/tapper?username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}&first_time=1`
							},
						},
					],
				],
			},
		})
	} else if (text.includes('/start')) {
		await bot.sendMessage(chatId, 'Check out our app', {
			reply_markup: {
				inline_keyboard: [
					[
						{	
							text: 'Open',
							web_app: {
								url: `${webAppUrl}?username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}&first_time=1`
							},
						},
					],
				],
			},
		})
	}
});