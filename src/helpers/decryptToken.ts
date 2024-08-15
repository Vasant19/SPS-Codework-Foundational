import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppRequest } from '../interfaces';
import { dataToJSON } from './jsonConverter';

export const DecryptToken = (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY ?? 'JWT_SECRET_KEY';
  if (req.headers?.authorization) {
    try {
      const tokenArr = req.headers.authorization?.split(' ');
      const token: any =
        tokenArr && tokenArr?.length > 1
          ? tokenArr[1]
          : req.headers.authorization;
      const verified: any = jwt.verify(token, jwtSecretKey);
      if (verified) {
        console.log('🚀 => verified', verified);
        req.token_data = verified;
        next();
      } else {
        return res.status(401).json([{ message: 'Invalid Token' }]);
      }
    } catch ({ message }) {
      if (message === 'jwt expired') {
        return res.status(401).json([{ message: 'Token Expired' }]);
      } else if (message === 'invalid signature') {
        return res.status(401).json([{ message: 'Invalid Token' }]);
      } else if (message === 'jwt malformed') {
        return res.status(401).json([{ message: 'Invalid Token' }]);
      } else {
        console.log('message ==> ', message);

        return res.status(500).json([{ message: 'Something went wrong' }]);
      }
    }
  } else {
    return res
      .status(401)
      .json([{ message: 'Authorization token is required' }]);
  }
};

export const EncryptToken = (data: any) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY ?? 'JWT_SECRET_KEY';
  console.log('🚀 => EncryptToken => jwtSecretKey', jwtSecretKey);
  data = dataToJSON(data);
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
  } catch (error) {
    console.log('🚀 => EncryptToken => error', error);
  }

  return jwt.sign(data, jwtSecretKey);
};
