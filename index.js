const { Client, GatewayIntentBits, REST, ActivityType } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { readdirSync, readFileSync } = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const token = "MTIwOTE5NDE5ODg0MzEyOTk4Ng.GpY2be.aY8vwfFx0B1h0STiNhmYnzgfSuWRG3Kg5qWClY";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],    
});

const pink = '\x1b[95m';
const green = '\x1b[92m';
const blue = '\x1b[34m';
const gray = '\x1b[90m';
const red = '\x1b[91m';
const reset = '\x1b[0m';

const commands = [];

client.once('ready', async () => {
    console.log(`${green}(+) Logged in as ${client.user.tag}${reset}`);
  
    try {
      client.user.setPresence({
        activities: [{ name: 'Game Site Owners', type: ActivityType.Streaming, url: 'https://twitch.tv/discord' }],
        status: 'online',
      });
  
      const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
  
      for (const file of commandFiles) {
        try {
          const command = require(`./commands/${file}`);
          if (command.data instanceof SlashCommandBuilder) {
            commands.push(command.data.toJSON());
          }
        } catch (error) {
          console.error(`${red}(+) Error loading ${file}:${reset}`, error);
        }
      }
  
      const rest = new REST({ version: '10' }).setToken(token);
      const commandsPayload = commands.map(command => ({ name: command.name, description: command.description, options: command.options }));
  
      await rest.put(
        Routes.applicationGuildCommands("1209194198843129986", "1187934890113642596"),
        { body: [...commands] },
      );
        
    } catch (error) {
      console.error(`${red}(+) Error during initialization:${reset}`, error);
    }
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() && !interaction.isButton() && !interaction.isStringSelectMenu() && !interaction.isMessageComponent() &&!interaction.isModalSubmit()) return;

  try {
    if (interaction.isCommand()) {
      const commandFile = `./commands/${interaction.commandName}.js`;
      const command = require(commandFile);
      command.execute(interaction);
    } else {
      const componentFile = `./components/${interaction.customId}.js`; 
      const componentData = require(componentFile);
      componentData.execute(interaction);
    }
  } catch (error) {
    console.error(`${red}(+) Error during interaction handling:${reset}`, error);
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);


