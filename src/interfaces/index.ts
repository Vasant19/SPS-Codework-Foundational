import { Request } from 'express';

export interface AppRequest extends Request {
  token_data?: any;
}
