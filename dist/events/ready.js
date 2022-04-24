"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../classes/Event"));
const Ready = new Event_1.default({
    name: 'ready',
    once: true,
}, async () => {
    console.log('Ready!');
});
exports.default = Ready;
