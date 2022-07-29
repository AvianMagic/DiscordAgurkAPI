const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('messages user')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message for the user')
                .setRequired(true)),
	async execute(interaction, client) {
        await fetch('http://127.0.0.1:3191/message', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "receiver": 1,
                "sender": 0,
                "message": interaction.options.getString('message')
            })
        })
        interaction.reply('Send Message')
	},
};

