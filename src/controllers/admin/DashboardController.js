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
const mst_users_log_1 = require("../../models/mst_users_log");
const jsonConverter_1 = require("../../helpers/jsonConverter");
function Dashboard(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req === null || req === void 0 ? void 0 : req.token_data) === null || _a === void 0 ? void 0 : _a.is_admin) {
            try {
                const user_data = yield mst_users_log_1.mst_users_log.findAll({
                    attributes: ['user_log_id', 'check_in_time'],
                });
                const LogData = jsonConverter_1.dataToJSON(user_data);
                const total_data = LogData.length;
                const yesterday_data = LogData.filter((item) => moment().subtract(1, 'day').startOf('day') <
                    moment(item.check_in_time) &&
                    moment().subtract(1, 'day').endOf('day') > moment(item.check_in_time)).length;
                const seven_days_data = LogData.filter((item) => moment().subtract(7, 'day').startOf('day') <
                    moment(item.check_in_time) &&
                    moment().endOf('day') > moment(item.check_in_time)).length;
                const today_data = LogData.filter((item) => moment().startOf('day') < moment(item.check_in_time) &&
                    moment().endOf('day') > moment(item.check_in_time)).length;
                return res
                    .status(200)
                    .json({ total_data, today_data, yesterday_data, seven_days_data });
            }
            catch (error) {
                return res.status(500).json([{ message: 'Something went wrong' }]);
            }
        }
        else {
            res.status(401).json([{ message: 'Token invalid' }]);
        }
    });
}
exports.default = Dashboard;
//# sourceMappingURL=DashboardController.js.map