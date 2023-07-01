const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

module.exports = function registerSlash(client) {
	// register slash
	const commands = [];
	// Grab all the command files from the commands directory you created earlier
	const nameFolder = './src/commands';

	for (const folder of fs.readdirSync(nameFolder)) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = nameFolder + '/' + folder.toString();
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js'));
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath = commandsPath + '/' + file;
			const command = require(`${filePath.replace('/src', '.')}`);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
				client.commands.set(command.data.name, command);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(process.env.TOKEN);
	(async () => {
		try {
			console.log(
				`Started refreshing ${commands.length} application (/) commands.`
			);
			// guild
			/*
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
                { body: commands },
            );
            */
			const data = await rest.put(
				Routes.applicationCommands(process.env.CLIENT_ID),
				{ body: commands }
			);
			console.log(
				`Successfully reloaded ${data.length} application (/) commands.`
			);
		} catch (error) {
			console.error(error);
		}
	})();
};
