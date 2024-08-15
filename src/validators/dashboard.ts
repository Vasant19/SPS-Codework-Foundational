import * as Joi from 'joi';

const customMessage = (label: string, patternMessage?: string) => ({
  'string.min': `${label} is not valid`,
  'string.max': `${label} is not valid`,
  'any.required': `${label} is required`,
  'string.empty': `${label} is required`,
  'string.pattern.base': patternMessage
    ? patternMessage
    : `${label} is not valid`,
});

export const verifyCheckout = Joi.object({
  otp: Joi.string().length(6).required().messages(customMessage('OTP')),
});
