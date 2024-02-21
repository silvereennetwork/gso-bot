const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');


module.exports = {
    data: {
        customId: 'verify',
    },
    async execute(interaction) {
        try {
            const modal = new ModalBuilder()
                .setCustomId('verify_Modal')
                .setTitle('Verify');

            const Github = new TextInputBuilder()
                .setCustomId('github')
                .setLabel("Github (Just the User) EX: NCCoder2")
                .setStyle(TextInputStyle.Short)
                .setMaxLength(80);

            const Site = new TextInputBuilder()
                .setCustomId('site')
                .setLabel("Which site do you own/contribute?")
                .setMaxLength(80)
                .setStyle(TextInputStyle.Short);

            const status = new TextInputBuilder()
                .setCustomId('status')
                .setLabel("Do you contribute(c) or own(o). Type letter")
                .setMaxLength(1)
                .setStyle(TextInputStyle.Short);

            const siteLink = new TextInputBuilder()
                .setCustomId('site_link')
                .setLabel("Link to Your Site")
                .setMaxLength(80)
                .setStyle(TextInputStyle.Short);

            const siteDiscord = new TextInputBuilder()
                .setCustomId('site_discord')
                .setLabel("Discord Server (EX: goshadow)")
                .setMaxLength(80)
                .setStyle(TextInputStyle.Short);

            const onerow = new ActionRowBuilder().addComponents(Github);
            const tworow = new ActionRowBuilder().addComponents(Site);
            const statusrow = new ActionRowBuilder().addComponents(status);
            const threerow = new ActionRowBuilder().addComponents(siteLink);
            const fourrow = new ActionRowBuilder().addComponents(siteDiscord);
            modal.addComponents(onerow, tworow, threerow, fourrow, statusrow);
            await interaction.showModal(modal);
        } catch (error) {
            console.error('Error occurred:', error);
            interaction.reply({ content: 'An error has occurred.', ephemeral: true });
        }
    },
};