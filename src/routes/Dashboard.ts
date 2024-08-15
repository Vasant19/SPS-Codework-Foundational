import { Router } from 'express';
import Controllers from '../controllers';
import { DecryptToken } from '../helpers/decryptToken';
import { RequestValidator } from '../validators';
import { verifyCheckout } from '../validators/dashboard';

const DashboardRoutes = Router();

DashboardRoutes.post(
  '/checkout',
  DecryptToken,
  RequestValidator(verifyCheckout),
  Controllers.dashboard.ExitOTPVerify
);

export default DashboardRoutes;
