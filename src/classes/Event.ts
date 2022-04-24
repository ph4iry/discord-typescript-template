import { EventOptions } from '../util';

export default class Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;

  constructor(options: EventOptions, action: (...args: any[]) => Promise<void>) {
    this.name = options.name;
    this.once = options.once;

    this.execute = action;
  }
}