const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;
const webAppUrl = process.env.NGROK_LINK;

const bot = new TelegramBot(token, {polling: true});

const sentInlineKeyboard = {}; // объект для отслеживания чатов

bot.on('message', async (msg) => {
	try {
		const chatId = msg.chat.id;
		const text = msg.text;
	
		const photos = await bot.getUserProfilePhotos(msg.from.id);
	
		const photo = photos.photos[0]?.[0];
	
		if (photo) {
			const file = await bot.getFile(photo.file_id);
		
			const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
	
			if (text.includes('/start')) {
				await bot.sendMessage(chatId, 'Check out our app!', {
					reply_markup: {
						inline_keyboard: [
							[
								{	
									text: 'Open',
									web_app: {
										url: `${webAppUrl}/tapper?avatar=${encodeURIComponent(fileUrl)}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
									},
								},
							],
						],
					},
				});
			}
			return
		}
	
		if (text.includes('/start')) {
			await bot.sendMessage(chatId, 'Check out our app!', {
				reply_markup: {
					inline_keyboard: [
						[
							{	
								text: 'Open',
								web_app: {
									url: `${webAppUrl}/tapper?${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
								},
							},
						],
					],
				},
			});
		}
	} catch (error) {
		console.log(error)
	}
});
