import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { OTPTYPE } from '../constants';
import { mst_otp } from '../models/mst_otp';

const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  // secure: true,
  auth: {
    user: 'luciferkapoor7048@gmail.com',
    pass: '2401C8A3AE77F09B4181ECA75CD50DBEF186',
  },
});

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, './otptemplate.html');
const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);

const htmlToSend = (replacements) => template(replacements);
const mailDetails = (email_address, otp, username, subject, isNewAccount) => ({
  from: 'luciferkapoor7048@gmail.com',
  // process.env.EMAIL_USERNAME
  to: email_address,
  subject: subject,
  // text: `Your OTP is ${otp}`,
  html: htmlToSend({
    Username: username,
    OTP: otp,
    Email: email_address,
    TimeLimit: isNewAccount ? 'five (5) minutes' : 'six (6) hours',
    FinishMessage: isNewAccount ? 'logging in to SPS' : 'checkout from SPS',
  }),
});

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export async function sendOTPCode(
  email_address,
  user_full_name,
  subject,
  otp_type
) {
  const OTP = generateOTP();
  try {
    const value = await mst_otp.findOne({
      where: {
        otp_email: email_address,
      },
    });
    if (value) {
      const otp_value = await mst_otp.update(
        {
          otp_code: OTP,
          otp_type: otp_type,
        },
        {
          where: {
            otp_email: email_address,
            otp_type: otp_type,
          },
        }
      );
      transporter.sendMail(
        mailDetails(
          email_address,
          OTP,
          user_full_name,
          subject,
          otp_type === OTPTYPE.NEW_ACCOUNT
        ),
        function (err, data) {
          if (err) {
            console.log(err);
            console.log('Error Occurs');
          } else {
            console.log('Email sent successfully');
          }
        }
      );
      return otp_value;
    } else {
      const otp_value = await mst_otp.create({
        otp_email: email_address,
        otp_code: OTP,
        otp_type: otp_type,
      });
      transporter.sendMail(
        mailDetails(
          email_address,
          OTP,
          user_full_name,
          subject,
          otp_type === OTPTYPE.NEW_ACCOUNT
        ),
        function (err, data) {
          if (err) {
            console.log(err);
            console.log('Error Occurs');
          } else {
            console.log('Email sent successfully');
          }
        }
      );
      return otp_value;
    }
  } catch (error) {}
}
