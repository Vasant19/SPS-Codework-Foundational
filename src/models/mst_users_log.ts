import { DataTypes } from 'sequelize';
import { sequelize } from '../db/config';
import { STATUS } from '../constants';

export const mst_users_log = sequelize.define('mst_users_log', {
  user_log_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    // allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  user_car_no: {
    type: DataTypes.STRING(17),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(STATUS.CHECKED_IN, STATUS.CHECKED_OUT),
    defaultValue: STATUS.CHECKED_IN,
    allowNull: false,
  },
  check_in_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  check_out_time: {
    type: DataTypes.DATE,
    allowNull: true,
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
