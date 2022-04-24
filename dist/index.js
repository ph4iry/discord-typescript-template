"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("node:fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const discord_js_1 = require("discord.js");
const Bot_1 = __importDefault(require("./classes/Bot"));
const command_1 = __importDefault(require("./handlers/command"));
const events_1 = __importDefault(require("./handlers/events"));
const { TOKEN, EVENT_HANDLING_TYPE } = process.env;
const client = new Bot_1.default({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
// Command Handling
client.commands = new discord_js_1.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    (0, command_1.default)(client, file).then(() => {
        console.log('Loaded command: ' + file.slice(0, -3));
    });
}
// Event Handling Options: MONO_FILE or MULTI_FILE in your .env
switch (EVENT_HANDLING_TYPE) {
    default:
    case 'MONO_FILE':
        {
            client.once('ready', () => {
                console.log('Ready!');
            });
            client.on('interactionCreate', async (interaction) => {
                if (!interaction.isCommand())
                    return;
                const command = client.commands.get(interaction.commandName);
                if (!command)
                    return;
                try {
                    command.execute(client, interaction);
                }
                catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            });
        }
        break;
    case 'MULTI_FILE': {
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            (0, events_1.default)(client, file).then(() => {
                console.log('Loaded event: ' + file.slice(0, -3));
            });
        }
    }
}
client.login(TOKEN);
