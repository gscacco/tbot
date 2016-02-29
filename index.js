const Bot = require('node-telegram-bot');
const utils = require('./module/utils');
const w = require('winston');

w.level = 'debug';

const tToken = process.argv[2];

const bot = new Bot({
	token: tToken
});

const myId = process.argv[3];

w.info("Bot token:", tToken);

bot.on('message', function(msg) {
	w.debug(JSON.stringify(msg));
	if (msg.photo) {
		w.debug("isPicture");
		if (myId == msg.from.id) {
			w.info("Master message.");
			pictureFileId = msg.photo[0].file_id;
			w.info("Stored day menu with id: " + pictureFileId);
			bot.sendMessage({
				chat_id: msg.from.id,
				text: " Menù Aggiornato."
			})
		}
	} else {
		sendPic(msg.from.id);
	}
});

bot.start();

var sendPic = function(userId) {
	var fileObject = bot.getFile({
			file_id: pictureFileId
		})
		.then(function(result) {

				w.debug("Sending file_id: " + pictureFileId);
				w.debug("result: " + JSON.stringify(result));
				bot.sendPhoto({
					chat_id: userId,
					file_id: pictureFileId,
					photo: pictureFileId,
					caption: 'Menù del giorno'
				});

			}, function(error) {
				w.debug("Refreshed pic on server");
				bot.sendPhoto({
					chat_id: userId,
					files: {
						photo: './pics/menu.jpg'
					},
					caption: 'Menù del giorno'
				}).then(function(result) {
					pictureFileId = result.photo[0].file_id;
					w.debug("Stored new file_id: " + pictureFileId);

				});
			}

		).catch(function(error) {
			// handle errors from errorHandler1
			w.debug("Error Sending file_id: " + error);

		})
}
