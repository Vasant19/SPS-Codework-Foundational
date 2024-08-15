"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = exports.verifyCreatePassword = exports.verifyOTP = exports.Register = exports.verifyUserName = void 0;
const Joi = require("joi");
const customMessage = (label, patternMessage) => ({
    'string.min': `${label} is not valid`,
    'string.max': `${label} is not valid`,
    'any.required': `${label} is required`,
    'string.empty': `${label} is required`,
    'string.pattern.base': patternMessage
        ? patternMessage
        : `${label} is not valid`,
});
exports.verifyUserName = Joi.object({
    user_name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages(customMessage('User name')),
});
exports.Register = Joi.object()
    .options({ abortEarly: false })
    .keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'biz'] } })
        .required()
        .messages(customMessage('Email')),
    full_name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages(customMessage('Full name')),
    car_no: Joi.string()
        .min(8)
        .max(17)
        .required()
        .messages(customMessage('Car number')),
    phone: Joi.string()
        .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
        .required()
        .messages(customMessage('Phone Number')),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .required()
        .messages(customMessage('Password', 'Password should be atleast of 8 alphanumeric and 1 symbol with 1 uppercase')),
});
exports.verifyOTP = Joi.object({
    otp: Joi.string().length(6).required().messages(customMessage('OTP')),
});
exports.verifyCreatePassword = Joi.object({
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .required()
        .messages(customMessage('Password', 'Password should be atleast of 8 alphanumeric and 1 symbol with 1 uppercase')),
});
exports.verifyLogin = Joi.object()
    .options({ abortEarly: false })
    .keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'biz'] } })
        .required()
        .messages(customMessage('User Email')),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .required()
        .messages(customMessage('Password', 'Password should be atleast of 8 alphanumeric and 1 symbol with 1 uppercase')),
});
//# sourceMappingURL=auth.js.map