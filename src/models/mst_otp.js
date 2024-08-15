"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mst_otp = void 0;
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
const config_1 = require("../db/config");
exports.mst_otp = config_1.sequelize.define('mst_otp', {
    otp_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        // allowNull: false,
    },
    otp_email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    otp_code: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    },
    otp_type: {
        type: sequelize_1.DataTypes.ENUM(constants_1.OTPTYPE.NEW_ACCOUNT, constants_1.OTPTYPE.CHECKOUT),
        allowNull: false,
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
//# sourceMappingURL=mst_otp.js.map