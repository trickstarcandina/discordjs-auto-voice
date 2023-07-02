const fs = require('node:fs');

module.exports = function handlingEventsDiscord(client) {
	const eventsPath = './src/events/discordEvents'
	const eventFiles = fs
		.readdirSync(eventsPath)
		.filter((file) => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = eventsPath + '/' + file;
		const event = require(`${filePath.replace('/src', '.')}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
};
