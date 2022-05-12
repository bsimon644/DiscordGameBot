const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a game with the bot!")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("Select a game to play")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply("Game played here! (bot response)")
  }
}