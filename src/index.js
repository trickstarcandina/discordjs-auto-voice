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

client.commands = new Collection();

// register slash
registerSlash(client);

//create voice
indexEvent.handleEventsTempVoice(
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

client.login(process.env.TOKEN);
