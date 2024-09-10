const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;
const webAppUrl = process.env.NGROK_LINK;

const bot = new TelegramBot(token, {polling: true});

const sentInlineKeyboard = {}; // объект для отслеживания чатов

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	if (text.includes('/start')) {
		console.log(text);

		// Проверяем, была ли отправлена инлайн-кнопка для этого чата
		
		await bot.sendMessage(chatId, 'Check out our app in dev mode', {
			reply_markup: {
				inline_keyboard: [
					[
						{	
							text: 'Open',
							web_app: {
								url: `${webAppUrl}/tapper?username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
							},
						},
					],
				],
			},
		});
		// Помечаем, что инлайн-кнопка была отправлена
		sentInlineKeyboard[chatId] = true;
		

		if (!sentInlineKeyboard[chatId]) {
			await bot.sendMessage(chatId, 'Or open it via inline button:', {
				reply_markup: {
					keyboard: [
						[
							{
								text: 'Play',
								web_app: {
									url: `${webAppUrl}/tapper?username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
									request_full_screen: true,
								}
							}
						]
					],
					resize_keyboard: true,
				},
			});
		}
	} 
});
