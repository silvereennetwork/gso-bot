const {EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    customId: 'report_Modal',
  },
  async execute(interaction) {
    try {
        interaction.reply({content:"A request has been sent! Please wait for our moderators to approve you.", ephemeral:true});
        const github = interaction.fields.getTextInputValue('github');
        const site = interaction.fields.getTextInputValue('site');
        const siteLink = interaction.fields.getTextInputValue('site_link');
        const siteDiscord = interaction.fields.getTextInputValue('site_discord');
        const user = interaction.user;
        const footertext = `Reported by User: ${user.id}`;
      
        const verifyRequestEmbed = new EmbedBuilder()
          .setColor(15548997)
          .setTitle('New Verification Request!')
          .addFields(
            { name: 'Github', value: github, inline: true },
            { name: 'Site', value: site, inline: true },
            { name: 'Site Link', value: siteLink, inline: true },
            { name: 'Site Discord', value: siteDiscord, inline: true }
          )
          .setFooter({
            text: footertext,
            iconURL: user.displayAvatarURL(),
        });
        const verifylogs = await interaction.client.channels.fetch("1209207029059559444");
        verifylogs.send({ embeds: [verifyRequestEmbed] });
      
    } catch (error) {
        interaction.reply({ content: 'An error has occurred.', ephemeral: true });
    }
  },
};