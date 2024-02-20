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
                .setMaxLength(20);

            const Site = new TextInputBuilder()
                .setCustomId('site')
                .setLabel("Which site do you own?")
                .setMaxLength(20)
                .setStyle(TextInputStyle.Short);

            const siteLink = new TextInputBuilder()
                .setCustomId('site_link')
                .setLabel("Link to Your Site")
                .setMaxLength(20)
                .setStyle(TextInputStyle.Short);

            const siteDiscord = new TextInputBuilder()
                .setCustomId('site_discord')
                .setLabel("Discord (EX: goshadow)")
                .setMaxLength(20)
                .setStyle(TextInputStyle.Short);

            const onerow = new ActionRowBuilder().addComponents(Github);
            const tworow = new ActionRowBuilder().addComponents(Site);
            const threerow = new ActionRowBuilder().addComponents(siteLink);
            const fourrow = new ActionRowBuilder().addComponents(siteDiscord);
            modal.addComponents(onerow, tworow, threerow, fourrow);
            await interaction.showModal(modal);
        } catch (error) {
            console.error('Error occurred:', error);
            interaction.reply({ content: 'An error has occurred.', ephemeral: true });
        }
    },
};