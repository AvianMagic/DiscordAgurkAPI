const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const fetch = require('node-fetch')
const FormData = require('form-data')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calendar')
        .setDescription('Calendar command')
        .addSubcommand(subcommand =>
            subcommand
            .setName('status')
            .setDescription('Gives you a list of current events on the calendar')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('create')
            .setDescription("Creates a calendar event")
            .addStringOption(option =>
                option.setName('title')
                .setDescription('Event title')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Event description')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('location')
                .setDescription('Event location')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('year')
                .setDescription('Year of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('month')
                .setDescription('Month of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('date')
                .setDescription('date (day) of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('hour')
                .setDescription('Hour of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('minutes')
                .setDescription('Duration of event in minutes')
                .setRequired(true)
            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('groupcreate')
            .setDescription("Creates a group calendar event")
            .addStringOption(option =>
                option.setName('title')
                .setDescription('Event title')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Event description')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('location')
                .setDescription('Event location')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('year')
                .setDescription('Year of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('month')
                .setDescription('Month of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('date')
                .setDescription('date (day) of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('hour')
                .setDescription('Hour of event')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('minutes')
                .setDescription('Duration of event in minutes')
                .setRequired(true)
            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('delete')
            .setDescription("deletes a calendar event")
            .addStringOption(option =>
                option.setName('eventname')
                .setDescription('Event name')
                .setRequired(true)
            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('groupdelete')
            .setDescription("deletes group calendar event(s)")
            .addStringOption(option =>
                option.setName('eventname')
                .setDescription('Event name')
                .setRequired(true)
            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('edit')
            .setDescription("Updates a calendar event")
            .addStringOption(option =>
                option.setName('eventtitle')
                .setDescription('Original title of event')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('newtitle')
                .setDescription('Updated event title')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Updated event description')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('location')
                .setDescription('Updated event location')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('year')
                .setDescription('Year of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('month')
                .setDescription('Month of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('date')
                .setDescription('date (day) of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('hour')
                .setDescription('Hour of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('minutes')
                .setDescription('Duration of updated event in minutes')
                .setRequired(false)
            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('groupedit')
            .setDescription("Updates a calendar event in several calendars")
            .addStringOption(option =>
                option.setName('eventtitle')
                .setDescription('Original title of event(s)')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('newtitle')
                .setDescription('Updated event title')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Updated event description')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('location')
                .setDescription('Updated event location')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('year')
                .setDescription('Year of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('month')
                .setDescription('Month of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('date')
                .setDescription('date (day) of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('hour')
                .setDescription('Hour of updated event')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('minutes')
                .setDescription('Duration of updated event in minutes')
                .setRequired(false)
            )),
    async execute(interaction, client) {
        var data = new Object();
        data.mode = interaction.options.getSubcommand();
        if (interaction.options.getSubcommand() === 'delete' || interaction.options.getSubcommand() === 'groupdelete') {
            data.userId = 0
            data.eventName = interaction.options.getString('eventname')
            await interaction.reply('Event deleted!');
        } else if (interaction.options.getSubcommand() === 'create' || interaction.options.getSubcommand() === 'groupcreate') {
            data.userId = 0
            data.title = interaction.options.getString('title')
            data.description = interaction.options.getString('description')
            data.location = interaction.options.getString('location')
            data.year = interaction.options.getString('year')
            data.month = interaction.options.getString('month')
            data.date = interaction.options.getString('date')
            data.hour = interaction.options.getString('hour')
            data.minutes = interaction.options.getString('minutes')
            await interaction.reply('Event created!');
        } else if (interaction.options.getSubcommand() === 'edit' || interaction.options.getSubcommand() === 'groupedit') {
            console.log("Im here discord")
            data.userId = 0
            data.originalTitle = interaction.options.getString('eventtitle')
            data.title = interaction.options.getString('newtitle')
            data.description = interaction.options.getString('description')
            data.location = interaction.options.getString('location')
            data.year = interaction.options.getString('year')
            data.month = interaction.options.getString('month')
            data.date = interaction.options.getString('date')
            data.hour = interaction.options.getString('hour')
            data.minutes = interaction.options.getString('minutes')
            await interaction.reply('Event(s) updated!');
        } else if (interaction.options.getSubcommand() === 'status') {
            data.userId = 0
            await interaction.reply('Event(s) are here!');
        }
        fetch('http://localhost:3191/calendar', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                data
            })
        })
    },
}