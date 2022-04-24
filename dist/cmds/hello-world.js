"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const Command_1 = require("../classes/Command");
const data = new builders_1.SlashCommandBuilder()
    .setName('hello-world')
    .setDescription('Hello World!');
const HelloWorld = new Command_1.Command(data, (client, interaction) => {
    interaction.reply('Hello World!');
});
exports.default = HelloWorld;
