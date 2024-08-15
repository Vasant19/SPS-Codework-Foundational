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
const mst_admin_users_1 = require("../../models/mst_admin_users");
function ChangePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_data = yield mst_admin_users_1.mst_admin_users.findOne({
                where: {
                    user_email: req.token_data.user_email,
                },
            });
            if (!!!user_data) {
                return res.status(404).json([{ message: 'User not found!' }]);
            }
            else {
                user_data
                    .validateUserPassword(req.body.curr_password)
                    .then((msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg) {
                        user_data.user_password = req.body.new_password;
                        return res.status(200).json({
                            message: 'Password changed successfully',
                        });
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
exports.default = ChangePassword;
//# sourceMappingURL=ChangePasswordController.js.map