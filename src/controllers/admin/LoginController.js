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
const decryptToken_1 = require("../../helpers/decryptToken");
const jsonConverter_1 = require("../../helpers/jsonConverter");
const mst_admin_users_1 = require("../../models/mst_admin_users");
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_data = yield mst_admin_users_1.mst_admin_users.findOne({
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
                        const token = decryptToken_1.EncryptToken(Object.assign(Object.assign({}, jsonConverter_1.dataToJSON(user_data)), { is_admin: true }));
                        return res.status(200).json({
                            message: 'Login successfull',
                            auth_token: token,
                            full_name: user_data.user_full_name,
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
exports.default = Login;
//# sourceMappingURL=LoginController.js.map