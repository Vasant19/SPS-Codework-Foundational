import { Router } from 'express';
import Controllers from '../controllers';
import { DecryptToken } from '../helpers/decryptToken';

const AdminRoutes = Router();

AdminRoutes.get('/list', DecryptToken, Controllers.admin.AdminDashboard);
AdminRoutes.post('/vehicles', DecryptToken, Controllers.admin.ListVehicles);
AdminRoutes.post(
  '/change_password',
  DecryptToken,
  Controllers.admin.ChangePassword
);
AdminRoutes.post('/delete_log', DecryptToken, Controllers.admin.DeleteLog);
AdminRoutes.post('/login', Controllers.admin.Login);

// AdminRoutes.post(
//   '/register',
//   RequestValidator(Register),
//   Controllers.auth.Register
// );

// AdminRoutes.post(
//   '/verify_otp',
//   DecryptToken,
//   RequestValidator(verifyOTP),
//   Controllers.auth.VerifyOTP
// );

export default AdminRoutes;
