import { mst_users } from './../../models/mst_users';
import { OTPTYPE } from '../../constants';
import { EncryptToken } from '../../helpers/decryptToken';
import { dataToJSON } from '../../helpers/jsonConverter';
import { sendOTPCode } from '../../helpers/mailservice';

export default async function Register(req, res) {
  try {
    // Get exiting email user from database
    const existing_email: any = await mst_users.findOne({
      where: {
        user_email: req.body.email,
      },
    });

    // converting data to json
    const existing_email_json = dataToJSON(existing_email);
    console.log('🚀 => VerifyEmail => req.body.car_no', req.body.car_no);

    // Existing email user is verified and is active if not then check on timing
    if (existing_email && existing_email_json?.user_isverified) {
      // Response send with error
      return res.status(409).json({
        message: 'Email already exist.',
      });
    } else if (existing_email) {
      // User details update
      existing_email.user_full_name = req.body.full_name;
      existing_email.user_phone = req.body.phone;
      existing_email.user_password = req.body.password;
      existing_email.user_car_no = req.body.car_no;
      existing_email.user_isactive = 0;
      existing_email.user_isverified = 0;
      await existing_email.save();

      // OTP send to email
      await sendOTPCode(
        req.body.email,
        req.body.full_name,
        'Sign up to SPS',
        OTPTYPE.NEW_ACCOUNT
      );

      // Encrypt token
      const signup_token = EncryptToken(existing_email);

      // Response send with success
      return res.status(200).json({
        message: 'OTP sent to your email successfully.',
        signup_token: signup_token,
      });
    } else {
      // Creating new user
      const created_user = await mst_users.create({
        user_email: req.body.email,
        user_phone: req.body.phone,
        user_full_name: req.body.full_name,
        user_password: req.body.password,
        user_car_no: req.body.car_no,
      });
      if (created_user) {
        // OTP send to email
        await sendOTPCode(
          req.body.email,
          req.body.full_name,
          'Sign up to SPS',
          OTPTYPE.NEW_ACCOUNT
        );

        // Encrypt token
        const signup_token = EncryptToken(created_user);

        // Response send with success
        return res.status(200).json({
          message: 'OTP sent to your email successfully.',
          signup_token: signup_token,
        });
      } else {
        // Response send with error
        return res.status(500).send('Something went wrong');
      }
    }
  } catch (error) {
    console.log('🚀 => VerifyEmail => error', error);
    // Response send with error
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
}
