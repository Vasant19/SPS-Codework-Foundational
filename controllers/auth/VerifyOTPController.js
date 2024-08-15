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
const moment = require("moment");
const otpTypes_js_1 = require("../../constants/otpTypes.js");
const decryptToken_1 = require("../../helpers/decryptToken");
const jsonConverter_1 = require("../../helpers/jsonConverter");
const mailservice_1 = require("../../helpers/mailservice");
const models_1 = require("../../models");
const mst_users_log_js_1 = require("../../models/mst_users_log.js");
function VerifyOTP(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const otp_data = yield models_1.mst_otp.findOne({
                where: {
                    otp_email: req.token_data.user_email,
                    otp_type: otpTypes_js_1.OTPTYPE.NEW_ACCOUNT,
                },
            });
            const finalResponse = yield models_1.mst_users.findOne({
                where: {
                    user_id: req.token_data.user_id,
                },
            });
            console.log(finalResponse.user_full_name);
            if (jsonConverter_1.dataToJSON(otp_data) &&
                jsonConverter_1.dataToJSON(otp_data).otp_code === req.body.otp) {
                yield (models_1.mst_otp === null || models_1.mst_otp === void 0 ? void 0 : models_1.mst_otp.destroy({
                    where: {
                        otp_email: req.token_data.user_email,
                        otp_type: otpTypes_js_1.OTPTYPE.NEW_ACCOUNT,
                    },
                    truncate: true,
                }));
                finalResponse.user_isverified = true;
                finalResponse.user_isactive = true;
                finalResponse.save();
                const verified_token = decryptToken_1.EncryptToken(finalResponse);
                yield mailservice_1.sendOTPCode(req.token_data.user_email, finalResponse.user_full_name, 'OTP for checkout from SPS', otpTypes_js_1.OTPTYPE.CHECKOUT);
                yield mst_users_log_js_1.mst_users_log.create({
                    user_id: finalResponse.user_id,
                    user_full_name: finalResponse.user_full_name,
                    user_car_no: finalResponse.user_car_no,
                    check_in_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
                return res.status(200).json({
                    message: 'Email verified and Checkout OTP sent to your email successfully',
                    auth_token: verified_token,
                    otp_created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
            }
            else if (jsonConverter_1.dataToJSON(otp_data) &&
                jsonConverter_1.dataToJSON(otp_data).otp_code !== req.body.otp) {
                return res.status(403).json({
                    message: 'Invalid OTP',
                });
            }
            else if (jsonConverter_1.dataToJSON(finalResponse).user_isverified) {
                return res.status(403).json({
                    message: 'Already Verified',
                });
            }
            else {
                return res.status(400).json({
                    message: 'Unable to verify',
                });
            }
        }
        catch (error) {
            console.log('🚀 => VerifyOTP => error', error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    });
}
exports.default = VerifyOTP;
//# sourceMappingURL=VerifyOTPController.js.map