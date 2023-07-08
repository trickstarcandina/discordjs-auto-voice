require('dotenv').config({ path: '.env' });
const {
	Client,
	IntentsBitField,
	GatewayIntentBits,
	Collection,
} = require('discord.js');
const registerSlash = require('./slash/register');
const indexEvent = require('./events/index');

const client = new Client({
	intents: [
		IntentsBitField.Flags.GuildVoiceStates,
		IntentsBitField.Flags.Guilds,
		// for the unregister command
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,

		GatewayIntentBits.Guilds,
	],
});

const mongoose = require('mongoose');

const main = async () => {
	try {
		await mongoose
			.connect(process.env.MONGO_DB, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('MongoDB connected');
			})
			.catch((err) => {
				console.log(`Unable to connect MongoDB. Error: ${err}`);
			});

		await client.login(process.env.TOKEN);

		client.commands = new Collection();

		// register slash
		await registerSlash(client);

		//create voice
		await indexEvent.handleEventsTempVoice(
			client,
			process.env.CHANNEL_ID_GLOBAL,
			process.env.CATEGORY_ID_GLOBAL,
			process.env.CHANNEL_ID_DOUBLE,
			process.env.CATEGORY_ID_DOUBLE,
			process.env.CHANNEL_ID_ALONE,
			process.env.CATEGORY_ID_ALONE
		);

		//discord events
		indexEvent.handleEventsDiscord(client);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

main();
