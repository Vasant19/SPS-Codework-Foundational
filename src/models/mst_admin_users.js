"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mst_admin_users = void 0;
const bcrypt = require("bcrypt");
const sequelize_1 = require("sequelize");
const config_1 = require("../db/config");
exports.mst_admin_users = config_1.sequelize.define('mst_admin_users', {
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        // allowNull: false,
    },
    user_full_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
const updatePwd = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user.changed('user_password')) {
            const salt = bcrypt.genSaltSync(10);
            user.user_password = bcrypt.hashSync(user.user_password, salt);
        }
    });
};
exports.mst_admin_users.beforeCreate(updatePwd);
exports.mst_admin_users.beforeUpdate(updatePwd);
exports.mst_admin_users.prototype.validateUserPassword = function (user_password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(user_password, this.user_password);
    });
};
//# sourceMappingURL=mst_admin_users.js.map