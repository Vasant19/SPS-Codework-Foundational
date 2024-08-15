import moment = require('moment');
import { OTPTYPE } from '../../constants/otpTypes.js';
import { dataToJSON } from '../../helpers/jsonConverter';
import { mst_otp } from '../../models';
import { mst_users_log } from '../../models/mst_users_log.js';

export default async function ExitOTPVerify(req, res) {
  try {
    const otp_data = await mst_otp.findOne({
      where: {
        otp_email: req.token_data.user_email,
        otp_type: OTPTYPE.CHECKOUT,
      },
    });
    const found_log: any = await mst_users_log.findOne({
      where: {
        user_id: req.token_data.user_id,
      },
      order: [['created_at', 'DESC']],
    });

    if (
      dataToJSON(otp_data) &&
      dataToJSON(otp_data).otp_code === req.body.otp
    ) {
      await mst_otp?.destroy({
        where: {
          otp_email: req.token_data.user_email,
          otp_type: OTPTYPE.CHECKOUT,
        },
        truncate: true,
      });

      found_log.check_out_time = moment().format('YYYY-MM-DD HH:mm:ss');
      await found_log.save();

      return res.status(200).json({
        message: 'Checkout successfully',
      });
    } else if (
      dataToJSON(otp_data) &&
      dataToJSON(otp_data).otp_code !== req.body.otp
    ) {
      return res.status(403).json({
        message: 'Invalid OTP',
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
