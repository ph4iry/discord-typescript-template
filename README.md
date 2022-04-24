# Typescript Discord.js Template

A simple Typescript template for Discord.js v13, packed with a couple of extra features and commands.

## 💡 Installation

1) Duplicate the template with npm:

```bash
npx degit ph4iry/discord-typescript-template
```

2) Install all of the required modules:
```bash
npm install
```

## 🔑 Environment Variables

To run the project, you will need to add the following environment variables to an .env file in the directory:

### Discord Credentials
`TOKEN`: This is the token for your bot, and can be acquired in the Discord Developer Portal. Keep this secure!

`CLIENT_ID`: This is the client ID for your bot, and can also be found in the Discord Developer Portal under the OAUTH2 general tab.

`GUILD_ID`: This is the ID of the development server for your bot. Copy the ID of the server and place it here.

After adding these variables, your .env file may look something like this:
```
TOKEN=AbCdEfGhIjkLmnOpQR.St8Uv.WxYzAabbCDeFgHiJKLMnOp
CLIENT_ID=123456789012345678
GUILD_ID=123456789012345678
```

### Handler Options
`EVENT_HANDLING_TYPE`:
  - `MONO_FILE` (default): All events will be executed from the main `index.ts` file.
  - `MULTI_FILE`: Events will be handled in separate files in the `/events/` directory.

Example:
```
EVENT_HANDLING_TYPE=MULTI_FILE
```
## 🌟 Customizing Commands
Creating new commands with this template is very easy! Create a new file in the `/cmds/` directory and use the template below. Alternatively, you can copy and paste one of the built-in commands and fill in the content with what you want:
```typescript
import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../classes/Command';

const data = new SlashCommandBuilder()
  .setName('command-name')
  .setDescription('This is a command description!');

const CommandName = new Command(data, async (client: Client, interaction: CommandInteraction) => {
  await interaction.reply('Hello World!');
});
export default CommandName;
```