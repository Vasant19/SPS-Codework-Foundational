"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const src_1 = require("./src");
const IPAddress = '192.168.1.3';
const app = express();
src_1.default(app);
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
app
    .listen(port, IPAddress, function () {
    console.info(`Server running on : http://${IPAddress}:${port}`);
})
    .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('server startup error: address already in use');
    }
    else {
        console.log(err);
    }
});
//# sourceMappingURL=server.js.map