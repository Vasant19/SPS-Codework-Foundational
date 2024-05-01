import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { Application } from 'express';

import Server from './src';
import { mst_otp, mst_users } from './src/models';
import { mst_users_log } from './src/models/mst_users_log';

const IPAddress = '192.168.1.3';

const app: Application = express();
Server(app);
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app
  .listen(port, IPAddress, function () {
    console.info(`Server running on : http://${IPAddress}:${port}`);
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(err);
    }
  });
