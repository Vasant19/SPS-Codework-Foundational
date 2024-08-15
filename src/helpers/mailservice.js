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
exports.sendOTPCode = void 0;
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const constants_1 = require("../constants");
const mst_otp_1 = require("../models/mst_otp");
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
function sendOTPCode(email_address, user_full_name, subject, otp_type) {
    return __awaiter(this, void 0, void 0, function* () {
        const OTP = generateOTP();
        try {
            const value = yield mst_otp_1.mst_otp.findOne({
                where: {
                    otp_email: email_address,
                },
            });
            if (value) {
                const otp_value = yield mst_otp_1.mst_otp.update({
                    otp_code: OTP,
                    otp_type: otp_type,
                }, {
                    where: {
                        otp_email: email_address,
                        otp_type: otp_type,
                    },
                });
                transporter.sendMail(mailDetails(email_address, OTP, user_full_name, subject, otp_type === constants_1.OTPTYPE.NEW_ACCOUNT), function (err, data) {
                    if (err) {
                        console.log(err);
                        console.log('Error Occurs');
                    }
                    else {
                        console.log('Email sent successfully');
                    }
                });
                return otp_value;
            }
            else {
                const otp_value = yield mst_otp_1.mst_otp.create({
                    otp_email: email_address,
                    otp_code: OTP,
                    otp_type: otp_type,
                });
                transporter.sendMail(mailDetails(email_address, OTP, user_full_name, subject, otp_type === constants_1.OTPTYPE.NEW_ACCOUNT), function (err, data) {
                    if (err) {
                        console.log(err);
                        console.log('Error Occurs');
                    }
                    else {
                        console.log('Email sent successfully');
                    }
                });
                return otp_value;
            }
        }
        catch (error) { }
    });
}
exports.sendOTPCode = sendOTPCode;
//# sourceMappingURL=mailservice.js.map