const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: {
    customId: 'report_Modal',
  },
  async execute(interaction) {
    try {
      interaction.reply({ content: "A request has been sent! Please wait for our moderators to approve you.", ephemeral: true });
      const github = interaction.fields.getTextInputValue('github');
      const site = interaction.fields.getTextInputValue('site');
      const siteLink = interaction.fields.getTextInputValue('site_link');
      const siteDiscord = interaction.fields.getTextInputValue('site_discord');
      const status = interaction.fields.getTextInputValue('status');
      const user = interaction.user;
      const footertext = `Reported by User: ${user.id}`;

      const verifyRequestEmbed = new EmbedBuilder()
        .setColor(0xF0A630)
        .setTitle('New Verification Request!')
        .addFields(
          { name: 'Github', value: '```' + github + '```', inline: true },
          { name: 'Site', value: '```' + site + '```', inline: true },
          { name: 'Site Link', value: '```' + siteLink + '```', inline: true },
          { name: 'Site Discord', value: '```' + siteDiscord + '```', inline: true },
          { name: 'Contributor/Owner?', value: '```' + status + '```', inline: true }
      )
        .setFooter({
          text: footertext,
          iconURL: user.displayAvatarURL(),
        });

      const acceptButton = new ButtonBuilder()
        .setCustomId('accept')
        .setLabel('Accept')
        .setStyle(ButtonStyle.Success);

      const denyButton = new ButtonBuilder()
        .setCustomId('deny')
        .setLabel('Deny')
        .setStyle(ButtonStyle.Danger);

      const actionRow = new ActionRowBuilder()
        .addComponents(acceptButton, denyButton);

    

      const verifylogs = await interaction.client.channels.fetch("1209337341261389867");
      verifylogs.send({
        embeds: [verifyRequestEmbed],
        components: [actionRow]
      });

    } catch (error) {
      interaction.reply({ content: 'An error has occurred.', ephemeral: true });
    }
  },
};