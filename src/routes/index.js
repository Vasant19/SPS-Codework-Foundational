"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const Adminrouter_1 = require("./Adminrouter");
const AuthRouter_1 = require("./AuthRouter");
const Dashboard_1 = require("./Dashboard");
const Approuters = (app) => {
    // Authentication Routes
    app.use(constants_1.ModuleRoutes.Auth, AuthRouter_1.default);
    // Dashboard Routes
    app.use(constants_1.ModuleRoutes.Dashboard, Dashboard_1.default);
    // Dashboard Routes
    app.use(constants_1.ModuleRoutes.Admin, Adminrouter_1.default);
};
exports.default = Approuters;
//# sourceMappingURL=index.js.map