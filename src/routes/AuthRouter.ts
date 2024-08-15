import { Router } from 'express';
import Controllers from '../controllers';
import { DecryptToken } from '../helpers/decryptToken';
import { RequestValidator } from '../validators';
import { verifyLogin, Register, verifyOTP } from '../validators/auth';

const AuthRoutes = Router();

AuthRoutes.post(
  '/login',
  RequestValidator(verifyLogin),
  Controllers.auth.Login
);

AuthRoutes.post(
  '/register',
  RequestValidator(Register),
  Controllers.auth.Register
);

AuthRoutes.post(
  '/verify_otp',
  DecryptToken,
  RequestValidator(verifyOTP),
  Controllers.auth.VerifyOTP
);

export default AuthRoutes;
