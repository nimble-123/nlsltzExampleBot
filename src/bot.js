require("dotenv").config()
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });

bot.getMe().then(me => {
	console.log("Hi my name is %s!", me.username);
});

//matches /start
bot.onText(/\/start/, (msg, match) => {
	const fromId = msg.from.id; // get the id, of who is sending the message
	const message = "Welcome to your nlsltzExampleBot\n";
	message += "Get me to say your name with /hello [your_name_here].";
	bot.sendMessage(fromId, message);
});

// Matches '/echo [whatever]'
bot.onText(/\/echo (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message
	const chatId = msg.chat.id;
	const resp = match[1]; // the captured 'whatever'

	// send back the matched 'whatever' to the chat
	bot.sendMessage(chatId, resp);
});

//match /hello [whatever]
bot.onText(/\/hello (.+)/, (msg, match) => {
	const fromId = msg.from.id; // get the id, of who is sending the message
	const userName = match[1];
	const message = "Hello " + userName + ", good to see you!";
	bot.sendMessage(fromId, message);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", msg => {
	const chatId = msg.chat.id;

	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, "Received your message: '" + msg.text + "'.");
});
