const Bot = require('node-telegram-bot');
const utils = require('./module/utils');
const w = require('winston');

w.level = 'debug';

const tToken = process.argv[2];

const bot = new Bot({
	token: tToken
});

const myId = 169803530;
var pictureFileId = "AgADBAADv6cxGwr_Hgp6b8He0seVIIyGGxkABH42Bft8mIA0biMCAAEC";

w.info("Bot token:", tToken);

bot.on('message', function (msg) {
	console.log(JSON.stringify(msg));
	var isPic = isPicture(msg);
	console.log("isPicture? :" + isPic);
	if (isPic) {
		if (myId == msg.from.id) {
			console.log("Master message.");
			{
				pictureFileId = msg.photo[1].file_id;
				console.log("Stored day menu with id: " + pictureFileId);
				bot.sendMessage({chat_id: msg.from.id, text: " Menù Aggiornato."})
			}

		}
	}
	else {
		sendPic(msg.from.id);
	}

	utils.handle(msg, bot);

});

bot.start();

var isPicture = function (msg) {

	return msg.photo != undefined;
};

var sendPic = function (userId) {
	var fileObject = bot.getFile({file_id: pictureFileId})
		.then(function (result) {

			console.log("Sending file_id: " + pictureFileId);
			console.log("result: " + JSON.stringify(result));
			bot.sendPhoto({
				chat_id: userId,
				file_id: pictureFileId,
				photo: pictureFileId,
				caption: 'Menù del giorno'
			});

		}, function errorHandler1(error) {
			console.log("Refreshed pic on server");
			bot.sendPhoto({
				chat_id: userId,
				files: {
					photo: './pics/menu.jpg'
				},
				caption: 'Menù del giorno'
			}).then(function (result) {
				pictureFileId = result.photo[0].file_id;
				console.log("Stored new file_id: " + pictureFileId);

			});
		}

	).catch(function errorHandler2(error) {
			// handle errors from errorHandler1
			console.log("Error Sending file_id: " + error);

		})
}


