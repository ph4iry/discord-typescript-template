"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    data;
    execute;
    /**
     *
     * @param d SlashCommandBuilder with command data.
     * @param run The actual command's activity.
     */
    constructor(d, run) {
        this.data = d;
        this.execute = run;
    }
    setData(data) {
        this.data = data;
    }
}
exports.Command = Command;
