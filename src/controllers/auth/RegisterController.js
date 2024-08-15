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
const mst_users_1 = require("./../../models/mst_users");
const constants_1 = require("../../constants");
const decryptToken_1 = require("../../helpers/decryptToken");
const jsonConverter_1 = require("../../helpers/jsonConverter");
const mailservice_1 = require("../../helpers/mailservice");
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get exiting email user from database
            const existing_email = yield mst_users_1.mst_users.findOne({
                where: {
                    user_email: req.body.email,
                },
            });
            // converting data to json
            const existing_email_json = jsonConverter_1.dataToJSON(existing_email);
            console.log('🚀 => VerifyEmail => req.body.car_no', req.body.car_no);
            // Existing email user is verified and is active if not then check on timing
            if (existing_email && (existing_email_json === null || existing_email_json === void 0 ? void 0 : existing_email_json.user_isverified)) {
                // Response send with error
                return res.status(409).json({
                    message: 'Email already exist.',
                });
            }
            else if (existing_email) {
                // User details update
                existing_email.user_full_name = req.body.full_name;
                existing_email.user_phone = req.body.phone;
                existing_email.user_password = req.body.password;
                existing_email.user_car_no = req.body.car_no;
                existing_email.user_isactive = 0;
                existing_email.user_isverified = 0;
                yield existing_email.save();
                // OTP send to email
                yield mailservice_1.sendOTPCode(req.body.email, req.body.full_name, 'Sign up to SPS', constants_1.OTPTYPE.NEW_ACCOUNT);
                // Encrypt token
                const signup_token = decryptToken_1.EncryptToken(existing_email);
                // Response send with success
                return res.status(200).json({
                    message: 'OTP sent to your email successfully.',
                    signup_token: signup_token,
                });
            }
            else {
                // Creating new user
                const created_user = yield mst_users_1.mst_users.create({
                    user_email: req.body.email,
                    user_phone: req.body.phone,
                    user_full_name: req.body.full_name,
                    user_password: req.body.password,
                    user_car_no: req.body.car_no,
                });
                if (created_user) {
                    // OTP send to email
                    yield mailservice_1.sendOTPCode(req.body.email, req.body.full_name, 'Sign up to SPS', constants_1.OTPTYPE.NEW_ACCOUNT);
                    // Encrypt token
                    const signup_token = decryptToken_1.EncryptToken(created_user);
                    // Response send with success
                    return res.status(200).json({
                        message: 'OTP sent to your email successfully.',
                        signup_token: signup_token,
                    });
                }
                else {
                    // Response send with error
                    return res.status(500).send('Something went wrong');
                }
            }
        }
        catch (error) {
            console.log('🚀 => VerifyEmail => error', error);
            // Response send with error
            return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
        }
    });
}
exports.default = Register;
//# sourceMappingURL=RegisterController.js.map