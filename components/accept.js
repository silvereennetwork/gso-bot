

module.exports = {
    data: {
        customId: 'accept',
    },
    async execute(interaction) {
        try {
            const footer = interaction.message.embeds[0].footer.text;
            const userId = footer.split(': ')[1];
            const user = await interaction.client.users.fetch(userId);
            const guild = interaction.guild;
            const fieldValue = interaction.message.embeds[0].fields[4].value.replace(/`/g, '').toUpperCase();

            let verificationRoleid;
            if (fieldValue === 'C') {
                verificationRoleid = '1208861397895741450'; 
            } else if (fieldValue === 'O') {
                verificationRoleid = '1208861349610917968';
            } else {
                await interaction.reply({ content: `Invalid value in the Contributor/Owner Field. Role not added.`, ephemeral: true });
                return;
            }

            const verificationRole = guild.roles.cache.get(verificationRoleid);

            if (verificationRole) {
                await guild.members.fetch(user.id).then(member => {
                    member.roles.add(verificationRole);
                });
                await interaction.message.edit({
                    components: []
                });
                await interaction.reply({ content: `Role added to user : <@${userId}>`, ephemeral: true });
            } else {
                await interaction.reply({ content: `Role not found.`, ephemeral: true });
            }
        } catch (error) {
            console.error(error);
        }
    },
};
