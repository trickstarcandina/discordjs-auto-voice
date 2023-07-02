const {
	TempChannelsManagerEvents,
	TempChannelsManager,
} = require('@hunteroi/discord-temp-channels/lib');
module.exports = function createEventReady(client, channel, category, name) {
	const manager = new TempChannelsManager(client);
	client.on('ready', () => {
		console.log('Connected!');

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
			childCanBeRenamed: true
		});
	});

	manager.on(TempChannelsManagerEvents.channelRegister, (parent) =>
		console.log('Registered', parent)
	);
	manager.on(TempChannelsManagerEvents.channelUnregister, (parent) =>
		console.log('Unregistered', parent)
	);
	manager.on(TempChannelsManagerEvents.childAdd, (child, parent) =>
		console.log('Child added!', child, parent)
	);
	manager.on(TempChannelsManagerEvents.childRemove, (child, parent) =>
		console.log('Child removed!', child, parent)
	);
	// manager.on(TempChannelsManagerEvents.childPrefixChange, (child) =>
	// 	console.log('Prefix changed', child)
	// );
};
