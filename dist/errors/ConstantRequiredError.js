"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantRequiredError = void 0;
class ConstantRequiredError extends Error {
    property;
    constructor(property) {
        super(`There is a missing constant that needs to be declared: ${property}\nTip: Add the property "${property}" to your .env file and try again.`);
        this.name = 'ConstantRequiredError';
        this.property = property;
    }
    static validate(...data) {
        for (const item of data) {
            if (typeof item.data !== 'string') {
                throw new ConstantRequiredError(item.name);
            }
        }
    }
}
exports.ConstantRequiredError = ConstantRequiredError;
