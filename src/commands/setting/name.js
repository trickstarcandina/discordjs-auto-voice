const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('name')
		.setDescription('Rename Voice Channel!')
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('Enter new voice name channel')
				.setRequired(true)
		),
	async execute(interaction) {
		const channelIdVoice = interaction.member.voice.channelId;
		if (!channelIdVoice) {
			await interaction.reply(`Cannot find voice channel`);
		}
		let guild = interaction.client.guilds.cache.get(interaction.guildId);
		let channel = guild.channels.cache.get(channelIdVoice);
		console.log(channel);
		const nameChannel = interaction.options.getString('input') ?? 'No name :3';
		channel.setName(nameChannel).catch(console.error);
		await interaction.reply(`Change name to ${nameChannel} successfully`);
	},
};
