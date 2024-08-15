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
const otpTypes_1 = require("../../constants/otpTypes");
const decryptToken_1 = require("../../helpers/decryptToken");
const jsonConverter_1 = require("../../helpers/jsonConverter");
const mailservice_1 = require("../../helpers/mailservice");
const models_1 = require("../../models");
const mst_users_1 = require("../../models/mst_users");
const mst_users_log_1 = require("../../models/mst_users_log");
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_data = yield mst_users_1.mst_users.findOne({
                where: {
                    user_email: req.body.email,
                },
            });
            if (!!!user_data) {
                return res.status(404).json([{ message: 'User not found!' }]);
            }
            else {
                user_data.validateUserPassword(req.body.password).then((msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg) {
                        const token = decryptToken_1.EncryptToken(jsonConverter_1.dataToJSON(user_data));
                        const otp_data = yield models_1.mst_otp.findOne({
                            where: {
                                otp_email: req.body.email,
                                otp_type: otpTypes_1.OTPTYPE.CHECKOUT,
                            },
                        });
                        const found_log = yield mst_users_log_1.mst_users_log.findOne({
                            where: {
                                user_id: user_data.user_id,
                            },
                            order: [['created_at', 'DESC']],
                        });
                        let Check_in_time = moment().format('YYYY-MM-DD HH:mm:ss');
                        if (found_log) {
                            if (jsonConverter_1.dataToJSON(found_log).check_out_time) {
                                yield mst_users_log_1.mst_users_log.create({
                                    user_id: user_data.user_id,
                                    user_full_name: user_data.user_full_name,
                                    user_car_no: user_data.user_car_no,
                                    check_in_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                                });
                            }
                            else {
                                Check_in_time = jsonConverter_1.dataToJSON(found_log).check_in_time;
                            }
                        }
                        else {
                            yield mst_users_log_1.mst_users_log.create({
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
                        }
                        else {
                            yield mailservice_1.sendOTPCode(user_data.user_email, user_data.user_full_name, 'OTP for checkout from SPS', otpTypes_1.OTPTYPE.CHECKOUT);
                            return res.status(200).json({
                                message: 'Login successfull and checkout OTP sent to your email successfully',
                                auth_token: token,
                                otp_created_at: Check_in_time,
                            });
                        }
                    }
                    else {
                        return res.status(401).json([{ message: 'Invalid Credentials' }]);
                    }
                }));
            }
        }
        catch (error) {
            return res.status(500).json([{ message: 'Something went wrong' }]);
        }
    });
}
exports.default = Login;
//# sourceMappingURL=LoginController.js.map