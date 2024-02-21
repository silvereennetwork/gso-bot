const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');


module.exports = {
    data: {
        customId: 'deny',
    },
    async execute(interaction) {
        try {
            const footer = interaction.message.embeds[0].footer.text;
            const userId = footer.split(': ')[1];
            const modal = new ModalBuilder()
                .setCustomId('deny_modal')
                .setTitle('Verify');

            const reason = new TextInputBuilder()
                .setCustomId('reason')
                .setLabel("Reason")
                .setStyle(TextInputStyle.Short)

            const userid = new TextInputBuilder()
                .setCustomId('userid')
                .setLabel("User ID (Preset)")
                .setValue(userId)
                .setStyle(TextInputStyle.Short)

            const onerow = new ActionRowBuilder().addComponents(reason);
            const tworow = new ActionRowBuilder().addComponents(userid);
            modal.addComponents(onerow, tworow);
            await interaction.showModal(modal);
        } catch (error) {
            console.error(error);
        }
    },
};
