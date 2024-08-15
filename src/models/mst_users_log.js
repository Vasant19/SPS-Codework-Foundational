"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mst_users_log = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../db/config");
const constants_1 = require("../constants");
exports.mst_users_log = config_1.sequelize.define('mst_users_log', {
    user_log_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        // allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    user_full_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    user_car_no: {
        type: sequelize_1.DataTypes.STRING(17),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(constants_1.STATUS.CHECKED_IN, constants_1.STATUS.CHECKED_OUT),
        defaultValue: constants_1.STATUS.CHECKED_IN,
        allowNull: false,
    },
    check_in_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    check_out_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        field: 'created_at',
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: sequelize_1.DataTypes.DATE,
    },
});
//# sourceMappingURL=mst_users_log.js.map