import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';

export class Command {
  data: SlashCommandBuilder;
  execute: (client: Client, interaction: CommandInteraction) => void;

  /**
   *
   * @param d SlashCommandBuilder with command data.
   * @param run The actual command's activity.
   */
  constructor(d: SlashCommandBuilder, run: (client: Client, interaction: CommandInteraction) => void) {
    this.data = d;
    this.execute = run;
  }

  setData(data: SlashCommandBuilder) {
    this.data = data;
  }
}