import moment = require('moment');
import { OTPTYPE } from '../../constants/otpTypes.js';
import { EncryptToken } from '../../helpers/decryptToken';
import { dataToJSON } from '../../helpers/jsonConverter';
import { sendOTPCode } from '../../helpers/mailservice';
import { mst_otp, mst_users } from '../../models';
import { mst_users_log } from '../../models/mst_users_log.js';

export default async function VerifyOTP(req, res) {
  try {
    const otp_data = await mst_otp.findOne({
      where: {
        otp_email: req.token_data.user_email,
        otp_type: OTPTYPE.NEW_ACCOUNT,
      },
    });
    const finalResponse: any = await mst_users.findOne({
      where: {
        user_id: req.token_data.user_id,
      },
    });

    console.log(finalResponse.user_full_name);

    if (
      dataToJSON(otp_data) &&
      dataToJSON(otp_data).otp_code === req.body.otp
    ) {
      await mst_otp?.destroy({
        where: {
          otp_email: req.token_data.user_email,
          otp_type: OTPTYPE.NEW_ACCOUNT,
        },
        truncate: true,
      });
      finalResponse.user_isverified = true;
      finalResponse.user_isactive = true;
      finalResponse.save();

      const verified_token = EncryptToken(finalResponse);

      await sendOTPCode(
        req.token_data.user_email,
        finalResponse.user_full_name,
        'OTP for checkout from SPS',
        OTPTYPE.CHECKOUT
      );
      await mst_users_log.create({
        user_id: finalResponse.user_id,
        user_full_name: finalResponse.user_full_name,
        user_car_no: finalResponse.user_car_no,
        check_in_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

      return res.status(200).json({
        message:
          'Email verified and Checkout OTP sent to your email successfully',
        auth_token: verified_token,
        otp_created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    } else if (
      dataToJSON(otp_data) &&
      dataToJSON(otp_data).otp_code !== req.body.otp
    ) {
      return res.status(403).json({
        message: 'Invalid OTP',
      });
    } else if (dataToJSON(finalResponse).user_isverified) {
      return res.status(403).json({
        message: 'Already Verified',
      });
    } else {
      return res.status(400).json({
        message: 'Unable to verify',
      });
    }
  } catch (error) {
    console.log('🚀 => VerifyOTP => error', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
