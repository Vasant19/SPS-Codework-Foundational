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
const sequelize_1 = require("sequelize");
const getPagination_1 = require("../../helpers/getPagination");
const mst_users_log_1 = require("../../models/mst_users_log");
const moment = require("moment");
function ListVehicles(req, res) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req === null || req === void 0 ? void 0 : req.token_data) === null || _a === void 0 ? void 0 : _a.is_admin) {
            try {
                const { limit, offset } = getPagination_1.getPagination(req.body);
                const whereClause = {
                    user_car_no: { [sequelize_1.Op.like]: `%${(_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.search_keyword) !== null && _c !== void 0 ? _c : ''}%` },
                };
                if (((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.start_date) && ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.end_date)) {
                    whereClause.check_in_time = {
                        [sequelize_1.Op.gt]: moment((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.start_date)
                            .startOf('day')
                            .format('YYYY-MM-DD HH:mm:ss'),
                        [sequelize_1.Op.lt]: moment((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.end_date)
                            .startOf('day')
                            .format('YYYY-MM-DD HH:mm:ss'),
                    };
                }
                const user_data = yield mst_users_log_1.mst_users_log.findAndCountAll({
                    limit,
                    offset,
                    //   attributes: ['user_log_id', 'check_in_time'],
                    where: whereClause,
                    order: [['check_in_time', 'DESC']],
                });
                return res.status(200).json({
                    total_pages: Math.ceil(user_data.count / limit),
                    list: user_data.rows,
                });
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
exports.default = ListVehicles;
//# sourceMappingURL=ListManageVehiclesController.js.map