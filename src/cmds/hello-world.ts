import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../classes/Command';

const data = new SlashCommandBuilder()
  .setName('hello-world')
  .setDescription('Hello World!');

const HelloWorld = new Command(data, async (client: Client, interaction: CommandInteraction) => {
  await interaction.reply('Hello World!');
});
export default HelloWorld;