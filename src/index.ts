import { Application, json, urlencoded } from 'express';
import * as helmet from 'helmet';
import * as winston from 'winston';
import * as cors from 'cors';

import { unCoughtErrorHandler } from './handlers/errorHandler';
import rateLimiter from './middlewares/rateLimit';
import Approuters from './routes';
import { mst_otp, mst_users } from './models';
import { mst_users_log } from './models/mst_users_log';
import { mst_admin_users } from './models/mst_admin_users';

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

export default function Server(app: Application) {
  mst_users.sync();
  mst_otp.sync();
  mst_users_log.sync();
  mst_admin_users.sync();
  app.use(cors());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(helmet());
  app.use(rateLimiter()); //  apply to all requests
  Approuters(app);
  // app.use(unCoughtErrorHandler);
}

// process.on('beforeExit', function (err) {
//   winston.error(JSON.stringify(err));
//   console.error(err);
// });
