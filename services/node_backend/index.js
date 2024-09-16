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
				await bot.sendMessage(chatId, `🌍 Zayna – Investing in a Better Future 🌍
Welcome to Zayna! We’re not just an investment platform; we’re a community dedicated to earning money while making a positive impact on the world. Here’s what drives us:

💰 Earn and Help the Planet
Invest in climate projects that truly make a difference. With Zayna, your investments work for you and the planet’s future.

📚 Cryptocurrency Education
We don’t just offer investment tools—we provide knowledge about cryptocurrencies, helping you navigate the digital economy and boost your earnings. Education is key to successful investing.

🏥 Medical projects are important for the environment  
At Zayna, we support initiatives that help both nature and people. Our medical projects enable longer, more active, and happier lives, creating a healthy planet for everyone.

🔒 Transparency and Reliability
Zayna isn’t a short-term scheme. We’re a long-term project with a clear mission and transparent business model. Trust us for our honesty and responsibility.

⏳ Investing in the Future
Our actions today shape the world for future generations. Zayna is committed to improving the planet for tomorrow through every investment.

Join Zayna to earn and build a more sustainable world for yourself and your children. Together, we can make a difference! ☘️💪
#Investments #Cryptocurrency #Sustainability #EcoInvestments #Zayna #FutureOfThePlanet #Medicine`, {
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
			await bot.sendMessage(chatId, `🌍 Zayna – Investing in a Better Future 🌍
Welcome to Zayna! We’re not just an investment platform; we’re a community dedicated to earning money while making a positive impact on the world. Here’s what drives us:

💰 Earn and Help the Planet
Invest in climate projects that truly make a difference. With Zayna, your investments work for you and the planet’s future.

📚 Cryptocurrency Education
We don’t just offer investment tools—we provide knowledge about cryptocurrencies, helping you navigate the digital economy and boost your earnings. Education is key to successful investing.

🏥 Medical projects are important for the environment  
At Zayna, we support initiatives that help both nature and people. Our medical projects enable longer, more active, and happier lives, creating a healthy planet for everyone.

🔒 Transparency and Reliability
Zayna isn’t a short-term scheme. We’re a long-term project with a clear mission and transparent business model. Trust us for our honesty and responsibility.

⏳ Investing in the Future
Our actions today shape the world for future generations. Zayna is committed to improving the planet for tomorrow through every investment.

Join Zayna to earn and build a more sustainable world for yourself and your children. Together, we can make a difference! ☘️💪
#Investments #Cryptocurrency #Sustainability #EcoInvestments #Zayna #FutureOfThePlanet #Medicine`, {
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
