"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../classes/Event"));
const InteractionCreate = new Event_1.default({
    name: 'interactionCreate',
}, async (client, interaction) => {
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
exports.default = InteractionCreate;
