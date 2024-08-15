"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbUrl = process.env.DB_URL || '';
// export const sequelize = new Sequelize(dbUrl)
// dwij2003;
exports.sequelize = new sequelize_1.Sequelize('sps', 'root', 'Meet_9078', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully..');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=config.js.map