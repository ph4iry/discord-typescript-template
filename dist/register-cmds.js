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
// REST
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
// FS and Environment
const fs = __importStar(require("node:fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Error Validators
const ConstantRequiredError_1 = require("./errors/ConstantRequiredError");
// Constants
const { CLIENT_ID, GUILD_ID, TOKEN, } = process.env;
ConstantRequiredError_1.ConstantRequiredError.validate({ name: 'CLIENT_ID', data: CLIENT_ID }, { name: 'GUILD_ID', data: GUILD_ID }, { name: 'TOKEN', data: TOKEN });
const commands = [];
const commandFiles = fs.readdirSync('./cmds').filter(f => f.endsWith('.js'));
(async function () {
    for (const file of commandFiles) {
        const command = await Promise.resolve().then(() => __importStar(require(`./cmds/${file}`)));
        commands.push(command.default.data.toJSON());
    }
})().then(() => {
    const rest = new rest_1.REST({ version: '9' }).setToken(`${TOKEN}`);
    rest.put(v9_1.Routes.applicationGuildCommands(`${CLIENT_ID}`, `${GUILD_ID}`), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
});
