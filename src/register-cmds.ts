// REST
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

// FS and Environment
import * as fs from 'node:fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Error Validators
import { ConstantRequiredError } from './errors/ConstantRequiredError';

// Constants
const {
  CLIENT_ID,
  GUILD_ID,
  TOKEN,
} = process.env;

ConstantRequiredError.validate(
  { name: 'CLIENT_ID', data: CLIENT_ID },
  { name: 'GUILD_ID', data: GUILD_ID },
  { name: 'TOKEN', data: TOKEN },
);

const commands: any[] = [];

const commandFiles = fs.readdirSync('./cmds').filter(f => f.endsWith('.js'));

(async function() {
  for (const file of commandFiles) {
    const command = await import(`./cmds/${file}`);
    commands.push(command.default.data.toJSON());
  }
})().then(() => {
  const rest = new REST({ version: '9' }).setToken(`${TOKEN}`);
  rest.put(Routes.applicationGuildCommands(`${CLIENT_ID}`, `${GUILD_ID}`), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
});