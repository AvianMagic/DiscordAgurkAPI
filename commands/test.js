const { SlashCommandBuilder } = require('@discordjs/builders');
const messageUser = require('./messageUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('TEST!'),
	async execute(interaction, client) {
		await client.user.edit(username="test")
		await interaction.reply('WORK!');
	},
};
