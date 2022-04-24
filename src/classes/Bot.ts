import { Client, Collection, ClientOptions } from 'discord.js';

export default class Bot extends Client {
  commands: Collection<any, any>;
  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
  }
}