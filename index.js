const Bot = require('node-telegram-bot');
const utils = require('./module/utils');
const w = require('winston');

w.level = 'debug';

const tToken = process.argv[2];

const bot = new Bot({
	token: tToken
});

w.info("Bot token:", tToken);

bot.on('message', function(msg) {
    w.debug(JSON.stringify(msg));
	utils.handle(msg, bot);
});

bot.start();
