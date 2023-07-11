const eventReady = require('./voiceTempEvents/ready');
const mongodb = require('../database/mongodb');

module.exports = async function handlingEventsTempVoice(
	client,
	channelGlobal,
	categoryGlobal,
	channelCouple,
	categoryCouple,
	channelAlone,
	categoryAlone
) {
	let listChannelGlobal = await mongodb.findByParentId(channelGlobal);
	let listChannelCouple = await mongodb.findByParentId(channelCouple);
	let listChannelAlone = await mongodb.findByParentId(channelAlone);

	await Promise.all([
		eventReady(client, channelGlobal, categoryGlobal, '\'s room', listChannelGlobal.map(e => e.channelId).sort((a, b) => a.count - b.count)),
		eventReady(client, channelCouple, categoryCouple, ' và bồ', listChannelCouple.sort((a, b) => a.count - b.count)),
		eventReady(client, channelAlone, categoryAlone, ' một mình', listChannelAlone.sort((a, b) => a.count - b.count))
	])

};
