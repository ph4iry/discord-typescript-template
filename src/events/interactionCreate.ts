import { CommandInteraction } from 'discord.js';
import Bot from '../classes/Bot';
import { Command } from '../classes/Command';
import Event from '../classes/Event';

const InteractionCreate = new Event({
  name: 'interactionCreate',
}, async (client: Bot, interaction: CommandInteraction) => {
  const command: Command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

export default InteractionCreate;