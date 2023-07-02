const eventReady = require('./voiceTempEvents/ready');
module.exports = function handlingEventsTempVoice(
	client,
	channelGlobal,
	categoryGlobal,
	channelCouple,
	categoryCouple,
	channelAlone,
	categoryAlone
) {
	eventReady(client, channelGlobal, categoryGlobal, '\'s room');
	eventReady(client, channelCouple, categoryCouple, ' và bồ');
	eventReady(client, channelAlone, categoryAlone, ' một mình');
};
