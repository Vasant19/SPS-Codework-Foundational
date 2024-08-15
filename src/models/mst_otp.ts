import { DataTypes } from 'sequelize';
import { OTPTYPE } from '../constants';
import { sequelize } from '../db/config';

export const mst_otp = sequelize.define('mst_otp', {
  otp_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    // allowNull: false,
  },
  otp_email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  otp_code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  otp_type: {
    type: DataTypes.ENUM(OTPTYPE.NEW_ACCOUNT, OTPTYPE.CHECKOUT),
    allowNull: false,
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
