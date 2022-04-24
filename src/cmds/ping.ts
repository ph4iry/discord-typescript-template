import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../classes/Command';

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with pong');

const Ping = new Command(data, async (client: Client, interaction: CommandInteraction) => {
  await interaction.reply('pong');
});
export default Ping;