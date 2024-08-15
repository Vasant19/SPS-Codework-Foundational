"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptToken = exports.DecryptToken = void 0;
const jwt = require("jsonwebtoken");
const jsonConverter_1 = require("./jsonConverter");
const DecryptToken = (req, res, next) => {
    var _a, _b, _c;
    const jwtSecretKey = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : 'JWT_SECRET_KEY';
    if ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) {
        try {
            const tokenArr = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ');
            const token = tokenArr && (tokenArr === null || tokenArr === void 0 ? void 0 : tokenArr.length) > 1
                ? tokenArr[1]
                : req.headers.authorization;
            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                console.log('🚀 => verified', verified);
                req.token_data = verified;
                next();
            }
            else {
                return res.status(401).json([{ message: 'Invalid Token' }]);
            }
        }
        catch ({ message }) {
            if (message === 'jwt expired') {
                return res.status(401).json([{ message: 'Token Expired' }]);
            }
            else if (message === 'invalid signature') {
                return res.status(401).json([{ message: 'Invalid Token' }]);
            }
            else if (message === 'jwt malformed') {
                return res.status(401).json([{ message: 'Invalid Token' }]);
            }
            else {
                console.log('message ==> ', message);
                return res.status(500).json([{ message: 'Something went wrong' }]);
            }
        }
    }
    else {
        return res
            .status(401)
            .json([{ message: 'Authorization token is required' }]);
    }
};
exports.DecryptToken = DecryptToken;
const EncryptToken = (data) => {
    var _a;
    const jwtSecretKey = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : 'JWT_SECRET_KEY';
    console.log('🚀 => EncryptToken => jwtSecretKey', jwtSecretKey);
    data = jsonConverter_1.dataToJSON(data);
    delete data.user_password;
    delete data.user_name;
    delete data.user_phone;
    delete data.user_full_name;
    delete data.createdAt;
    delete data.updatedAt;
    data.time_stamp = new Date();
    console.log('🚀 => EncryptToken => rawData', typeof data);
    try {
        const token = jwt.sign(data, jwtSecretKey);
        console.log('DECODED TOKEN ==> ', jwt.verify(token, jwtSecretKey));
    }
    catch (error) {
        console.log('🚀 => EncryptToken => error', error);
    }
    return jwt.sign(data, jwtSecretKey);
};
exports.EncryptToken = EncryptToken;
//# sourceMappingURL=decryptToken.js.map