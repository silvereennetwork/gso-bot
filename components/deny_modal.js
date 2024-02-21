const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        customId: 'deny_modal',
    },
    async execute(interaction) {
        try {
            const userId = interaction.fields.getTextInputValue('userid');
            const reason = interaction.fields.getTextInputValue('reason');
            const user = await interaction.client.users.fetch(userId);
            const denyEmbed = new EmbedBuilder()
                .setTitle('Site Owner Access Denied')
                .setDescription(reason);
            await user.send({ embeds: [denyEmbed] });

            const message = await interaction.channel.messages.fetch(interaction.message.id);

            await message.edit({ components: [] });
            await interaction.reply({ content: `Application Denied Successfully!`, ephemeral: true });
        } catch (error) {
            console.error(error);
        }
    },
};
