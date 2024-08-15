import * as bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/config';

export const mst_users = sequelize.define('mst_users', {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    // allowNull: false,
  },
  user_full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  user_phone: {
    type: DataTypes.STRING(17),
    allowNull: false,
  },
  user_car_no: {
    type: DataTypes.STRING(17),
    allowNull: false,
  },
  user_isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  user_isverified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
  },
});

const updatePwd = async function (user) {
  if (user.changed('user_password')) {
    const salt = bcrypt.genSaltSync(10);
    user.user_password = bcrypt.hashSync(user.user_password, salt);
  }
};

mst_users.beforeCreate(updatePwd);
mst_users.beforeUpdate(updatePwd);

mst_users.prototype.validateUserPassword = async function (user_password) {
  return await bcrypt.compare(user_password, this.user_password);
};
