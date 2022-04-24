import Bot from '../classes/Bot';

export default async function getEvents(client: Bot, file: string) {
	const event = await import(`../events/${file}`);

	if (event.default.once) {
		client.once(event.default.name, (...args) => event.default.execute(client, ...args));
	} else {
		client.on(event.default.name, (...args) => event.default.execute(client, ...args));
	}
}