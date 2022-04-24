"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    name;
    once;
    execute;
    constructor(options, action) {
        this.name = options.name;
        this.once = options.once;
        this.execute = action;
    }
}
exports.default = Event;
