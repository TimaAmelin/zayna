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
										url: `${webAppUrl}/tapper?avatar=${encodeURIComponent(fileUrl)}&username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
									},
								},
							],
						],
					},
				});
	
				if (!sentInlineKeyboard[chatId]) {
					await bot.sendMessage(chatId, 'Or open it via inline button:', {
						reply_markup: {
							keyboard: [
								[
									{
										text: 'Play',
										web_app: {
											url: `${webAppUrl}/tapper?avatar=${encodeURIComponent(fileUrl)}&username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
											request_full_screen: true,
										}
									}
								]
							],
							resize_keyboard: true,
						},
					});
				}
				// Помечаем, что инлайн-кнопка была отправлена
				sentInlineKeyboard[chatId] = true;
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
									url: `${webAppUrl}/tapper?username=${msg.from.username}&id=${msg.from.id}${text.match(/\/start [0-9]*/) ? '&from=' + text.replace('/start ', '') : ''}${text.match(/\/start present[0-9]*/) ? '&present=' + text.replace('/start present', '') : ''}&first_time=1`,
								},
							},
						],
					],
				},
			});
	
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
			// Помечаем, что инлайн-кнопка была отправлена
			sentInlineKeyboard[chatId] = true;
		}
	} catch (error) {
		console.log(error)
	}
});
