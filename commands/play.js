const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a game with the bot!")
    /*
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("Select a game to play")
        .setRequired(true)
    )*/,
  async execute(interaction) {
    const rpsButtons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('rock')
          .setLabel('Rock')
          .setStyle(1)
          .setEmoji('🪨'),
        new MessageButton()
          .setCustomId('paper')
          .setLabel('Paper')
          .setStyle(1)
          .setEmoji('📄'),
        new MessageButton()
          .setCustomId('scissors')
          .setLabel('Scissors')
          .setStyle(1)
          .setEmoji('✂️')
      );

    interaction.reply({
      content: 'Bot response',
      components: [rpsButtons]
    })
  }
}