"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const decryptToken_1 = require("../helpers/decryptToken");
const AdminRoutes = express_1.Router();
AdminRoutes.get('/list', decryptToken_1.DecryptToken, controllers_1.default.admin.AdminDashboard);
AdminRoutes.post('/vehicles', decryptToken_1.DecryptToken, controllers_1.default.admin.ListVehicles);
AdminRoutes.post('/change_password', decryptToken_1.DecryptToken, controllers_1.default.admin.ChangePassword);
AdminRoutes.post('/delete_log', decryptToken_1.DecryptToken, controllers_1.default.admin.DeleteLog);
AdminRoutes.post('/login', controllers_1.default.admin.Login);
// AdminRoutes.post(
//   '/register',
//   RequestValidator(Register),
//   Controllers.auth.Register
// );
// AdminRoutes.post(
//   '/verify_otp',
//   DecryptToken,
//   RequestValidator(verifyOTP),
//   Controllers.auth.VerifyOTP
// );
exports.default = AdminRoutes;
//# sourceMappingURL=Adminrouter.js.map