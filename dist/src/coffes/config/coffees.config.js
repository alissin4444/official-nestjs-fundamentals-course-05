"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('coffees', () => ({
    foo: 'bar',
}));
//# sourceMappingURL=coffees.config.js.map