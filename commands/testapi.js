const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const FormData = require('form-data')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testapi')
		.setDescription('TEST CALL TO THE API!')
		.addUserOption(option =>
			option.setName('receiver')
			.setDescription('Receiving user')
			.setRequired(true))
		.addStringOption(option => 
			option.setName('string')
			.setDescription('String lol')
			.setRequired(true)
			),
	async execute(interaction, client) {
		var data = new Object();
		data.receiver = interaction.options.getUser('receiver').id
		data.message = interaction.options.getString('string')
		fetch('http://127.0.0.1:5000/testapi', {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
			},
			body: JSON.stringify(data)
		}).then(response=>response.json()).then(data=>interaction.reply(`<@${data.receiver}> there is a message for you: ${data.message}`))
	},
};

