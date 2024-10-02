"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
});
//# sourceMappingURL=app-config.js.map