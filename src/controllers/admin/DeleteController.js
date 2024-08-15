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
const mst_users_log_1 = require("../../models/mst_users_log");
function DeleteLog(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get exiting user name from database
            console.log('🚀 => req.body.customer_id', req.body.customer_id);
            const customer = yield mst_users_log_1.mst_users_log.destroy({
                where: { user_log_id: (_a = req.body) === null || _a === void 0 ? void 0 : _a.user_log_id },
            });
            if (customer) {
                return res.status(200).json({
                    message: 'Deleted Log Successfully',
                });
            }
            else {
                return res.status(404).json([
                    {
                        message: 'Log do not exist.',
                    },
                ]);
            }
        }
        catch (error) {
            console.log('🚀 => DeleteLog => error', error);
            // Response send with error
            return res.status(500).json([{ message: 'Something went wrong' }]);
        }
    });
}
exports.default = DeleteLog;
//# sourceMappingURL=DeleteController.js.map