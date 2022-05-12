require("dotenv").config();
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const token = process.env['token'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "9"
  }).setToken(token);

  (async () => {
    try {
      if(process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands
        });
        console.log("Successfully registered commands globally");
      }
      else {
        await rest.put(Routes.applicationCommands(CLIENT_ID, process.env.GUILD_ID), {
          body: commands
        });
        console.log("Successfully registered commands locally");
      }
    }
    catch(err) {
      if(err) console.error(err);
    }
  })();
});

client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(!command) return;
  
  try {
    await command.execute(interaction);
  }
  catch(err) {
    if (err) console.error(err);

    await interaction.reply({
      content: "An error occured while attempting to execute that command.",
      ephemeral: true
    });
  }
});

client.login(token);