"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const decryptToken_1 = require("../helpers/decryptToken");
const validators_1 = require("../validators");
const dashboard_1 = require("../validators/dashboard");
const DashboardRoutes = express_1.Router();
DashboardRoutes.post('/checkout', decryptToken_1.DecryptToken, validators_1.RequestValidator(dashboard_1.verifyCheckout), controllers_1.default.dashboard.ExitOTPVerify);
exports.default = DashboardRoutes;
//# sourceMappingURL=Dashboard.js.map