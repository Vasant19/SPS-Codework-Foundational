import * as bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/config';

export const mst_admin_users = sequelize.define('mst_admin_users', {
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

mst_admin_users.beforeCreate(updatePwd);
mst_admin_users.beforeUpdate(updatePwd);

mst_admin_users.prototype.validateUserPassword = async function (
  user_password
) {
  return await bcrypt.compare(user_password, this.user_password);
};
