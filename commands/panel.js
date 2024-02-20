const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panel')
    .setDescription('Responds with the Verification Panel'),
  async execute(interaction) {

    embed = new EmbedBuilder()
    .setTitle("Verification")
    .setDescription("Game Site Owners is a server for site owners to be able to communicate. To gain access to the server, you are required to be a Site Owner. ")
    .setFooter({
        iconURL: "https://cdn.discordapp.com/icons/1208852467891314798/3f99c012384b0f35297a7866554cd162.webp?size=1024&format=webp&width=0&height=309",
        text:"Game Site Owners"
    });

    const confirm = new ButtonBuilder()
        .setCustomId('verify')
        .setLabel('Verify')
        .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder()
        .addComponents(confirm);

    await interaction.reply({
		embeds: [embed],
		components: [row],
	});
  },
};