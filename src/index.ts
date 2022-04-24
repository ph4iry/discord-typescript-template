import path from 'path';
import * as fs from 'node:fs';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { Collection, Intents } from 'discord.js';

import Bot from './classes/Bot';

import getCommands from './handlers/command';
import { Command } from './classes/Command';
import getEvents from './handlers/events';
const { TOKEN, EVENT_HANDLING_TYPE } = process.env;

const client = new Bot({ intents: [Intents.FLAGS.GUILDS] });

// Command Handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  getCommands(client, file).then(() => {
    console.log('Loaded command: ' + file.slice(0, -3));
  });
}

// Event Handling Options: MONO_FILE or MULTI_FILE in your .env
switch (EVENT_HANDLING_TYPE) {
  default:
  case 'MONO_FILE': {
    client.once('ready', () => {
      console.log('Ready!');
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      const command: Command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        command.execute(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    });
  }
  break;
  case 'MULTI_FILE': {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      getEvents(client, file).then(() => {
        console.log('Loaded event: ' + file.slice(0, -3));
      });
    }
  }
}

client.login(TOKEN);