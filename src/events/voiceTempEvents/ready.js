const {
	TempChannelsManagerEvents,
	TempChannelsManager,
} = require('@hunteroi/discord-temp-channels/lib');
const mongodb = require('../../database/mongodb');

module.exports = function createEventReady(client, channel, category, name, listChannel) {
	const manager = new TempChannelsManager(client);
	client.on('ready', () => {
		console.log('Connected!');
		console.log(listChannel);
		manager.registerChannel(channel, {
			childCategory: category,
			childAutoDeleteIfEmpty: true,
			childAutoDeleteIfParentGetsUnregistered: true,
			childAutoDeleteIfOwnerLeaves: false,
			childVoiceFormat: (str, count) => `${str}${name}`,
			// `#${count}|${str}${name}`
			childVoiceFormatRegex: /^#\d+\|/,
			// childMaxUsers: 3,
			childBitrate: 64000,
			childShouldBeACopyOfParent: true,
			childCanBeRenamed: true,
			listChannelToRestore: listChannel
		});
	});

	manager.on(TempChannelsManagerEvents.channelRegister, (parent) =>
		console.log('Registered', parent)
	);
	manager.on(TempChannelsManagerEvents.channelUnregister, (parent) =>
		console.log('Unregistered', parent)
	);
	manager.on(TempChannelsManagerEvents.childAdd, (child, parent) => {
		mongodb.upsertNewChannel(child.voiceChannel.id, parent.channelId, child.orderChannel);
		console.log('Child added!', child, parent);
	});
	manager.on(TempChannelsManagerEvents.childRemove, (child, parent) => {
		mongodb.deleteByChannelId(child.voiceChannel.id);
		console.log('Child removed!', child, parent);
	});
	// manager.on(TempChannelsManagerEvents.childPrefixChange, (child) =>
	// 	console.log('Prefix changed', child)
	// );
};
