"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit_1 = require("./middlewares/rateLimit");
const routes_1 = require("./routes");
const models_1 = require("./models");
const mst_users_log_1 = require("./models/mst_users_log");
const mst_admin_users_1 = require("./models/mst_admin_users");
// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
function Server(app) {
    models_1.mst_users.sync();
    models_1.mst_otp.sync();
    mst_users_log_1.mst_users_log.sync();
    mst_admin_users_1.mst_admin_users.sync();
    app.use(cors());
    app.use(express_1.urlencoded({ extended: true }));
    app.use(express_1.json());
    app.use(helmet());
    app.use(rateLimit_1.default()); //  apply to all requests
    routes_1.default(app);
    // app.use(unCoughtErrorHandler);
}
exports.default = Server;
// process.on('beforeExit', function (err) {
//   winston.error(JSON.stringify(err));
//   console.error(err);
// });
//# sourceMappingURL=index.js.map