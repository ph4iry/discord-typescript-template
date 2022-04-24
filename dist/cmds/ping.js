"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const Command_1 = require("../classes/Command");
const data = new builders_1.SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping moment');
const Ping = new Command_1.Command(data, (client, interaction) => {
    interaction.reply('pong');
});
exports.default = Ping;
