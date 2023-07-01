require('dotenv').config({ path: '.env' });
const { Client, IntentsBitField, GatewayIntentBits, Collection, Events } = require('discord.js');
const { TempChannelsManager, TempChannelsManagerEvents } = require('@hunteroi/discord-temp-channels/lib');
const registerSlash = require('../src/slash/register');

const client = new Client({
  intents: [
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.Guilds,
    // for the unregister command
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

    GatewayIntentBits.Guilds
  ],
});

client.commands = new Collection();

// register slash
registerSlash(client);

//create voice
const manager = new TempChannelsManager(client);

client.on('ready', () => {
  console.log('Connected!');

  manager.registerChannel('1104617733649338459', {
    childCategory: '723531207543095319',
    childAutoDeleteIfEmpty: true,
    childAutoDeleteIfParentGetsUnregistered: true,
    childAutoDeleteIfOwnerLeaves: false,
    childVoiceFormat: (str, count) => `Example #${count} | ${str}`,
    childVoiceFormatRegex: /^Example #\d+ \|/,
    childMaxUsers: 3,
    childBitrate: 64000,
    childShouldBeACopyOfParent: false
  });
});

client.on('messageCreate', (message) => message.content === 'unregister' && manager.unregisterChannel('1104617733649338459'));

manager.on(TempChannelsManagerEvents.channelRegister, (parent) => console.log('Registered', parent));
manager.on(TempChannelsManagerEvents.channelUnregister, (parent) => console.log('Unregistered', parent));
manager.on(TempChannelsManagerEvents.childAdd, (child, parent) => console.log('Child added!', child, parent));
manager.on(TempChannelsManagerEvents.childRemove, (child, parent) => console.log('Child removed!', child, parent));
manager.on(TempChannelsManagerEvents.childPrefixChange, (child) => console.log('Prefix changed', child));

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN);