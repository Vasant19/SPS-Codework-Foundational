import moment = require('moment');
import { OTPTYPE } from '../../constants/otpTypes';
import { EncryptToken } from '../../helpers/decryptToken';
import { dataToJSON } from '../../helpers/jsonConverter';
import { sendOTPCode } from '../../helpers/mailservice';
import { mst_otp } from '../../models';
import { mst_users } from '../../models/mst_users';
import { mst_users_log } from '../../models/mst_users_log';

export default async function Login(req, res) {
  try {
    const user_data: any = await mst_users.findOne({
      where: {
        user_email: req.body.email,
      },
    });
    if (!!!user_data) {
      return res.status(404).json([{ message: 'User not found!' }]);
    } else {
      user_data.validateUserPassword(req.body.password).then(async (msg) => {
        if (msg) {
          const token = EncryptToken(dataToJSON(user_data));
          const otp_data: any = await mst_otp.findOne({
            where: {
              otp_email: req.body.email,
              otp_type: OTPTYPE.CHECKOUT,
            },
          });
          const found_log = await mst_users_log.findOne({
            where: {
              user_id: user_data.user_id,
            },
            order: [['created_at', 'DESC']],
          });
          let Check_in_time = moment().format('YYYY-MM-DD HH:mm:ss');
          if (found_log) {
            if (dataToJSON(found_log).check_out_time) {
              await mst_users_log.create({
                user_id: user_data.user_id,
                user_full_name: user_data.user_full_name,
                user_car_no: user_data.user_car_no,
                check_in_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              });
            } else {
              Check_in_time = dataToJSON(found_log).check_in_time;
            }
          } else {
            await mst_users_log.create({
              user_id: user_data.user_id,
              user_full_name: user_data.user_full_name,
              user_car_no: user_data.user_car_no,
              check_in_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
          }

          if (otp_data) {
            return res.status(200).json({
              message: 'Login successfull and you already have checkout OTP',
              auth_token: token,
              otp_created_at: Check_in_time,
            });
          } else {
            await sendOTPCode(
              user_data.user_email,
              user_data.user_full_name,
              'OTP for checkout from SPS',
              OTPTYPE.CHECKOUT
            );
            return res.status(200).json({
              message:
                'Login successfull and checkout OTP sent to your email successfully',
              auth_token: token,
              otp_created_at: Check_in_time,
            });
          }
        } else {
          return res.status(401).json([{ message: 'Invalid Credentials' }]);
        }
      });
    }
  } catch (error) {
    return res.status(500).json([{ message: 'Something went wrong' }]);
  }
}
