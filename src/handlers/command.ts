import Bot from '../classes/Bot';

export default async function getCommands(client: Bot, file: string) {
  const command = await import(`../cmds/${file}`);
  client.commands.set(command.default.data.name, command.default);
}