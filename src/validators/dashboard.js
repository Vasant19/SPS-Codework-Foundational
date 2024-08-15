"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCheckout = void 0;
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
exports.verifyCheckout = Joi.object({
    otp: Joi.string().length(6).required().messages(customMessage('OTP')),
});
//# sourceMappingURL=dashboard.js.map