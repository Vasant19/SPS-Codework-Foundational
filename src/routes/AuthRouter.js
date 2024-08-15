"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const decryptToken_1 = require("../helpers/decryptToken");
const validators_1 = require("../validators");
const auth_1 = require("../validators/auth");
const AuthRoutes = express_1.Router();
AuthRoutes.post('/login', validators_1.RequestValidator(auth_1.verifyLogin), controllers_1.default.auth.Login);
AuthRoutes.post('/register', validators_1.RequestValidator(auth_1.Register), controllers_1.default.auth.Register);
AuthRoutes.post('/verify_otp', decryptToken_1.DecryptToken, validators_1.RequestValidator(auth_1.verifyOTP), controllers_1.default.auth.VerifyOTP);
exports.default = AuthRoutes;
//# sourceMappingURL=AuthRouter.js.map