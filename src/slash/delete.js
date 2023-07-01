require('dotenv').config({ path: '.env' });
const { REST, Routes } = require('discord.js');
const rest = new REST().setToken(process.env.TOKEN);

// for guild-based commands
// rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, '723531207543095316'), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

//end 