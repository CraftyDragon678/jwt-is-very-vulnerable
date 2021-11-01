import type { Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import 'express-bearer-token';
import jwt from 'jsonwebtoken';
import config from '../../config';
import HttpException from '../../exceptions/HttpException';

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        admin: boolean;
      };
    }
  }
}

const attachUserInfo = expressAsyncHandler(async (req, res, next) => {
  if (!req.token) return next();
  try {
    req.user = jwt.verify(req.token, config.jwtSecret) as Request['user'];
    next();
  } catch {
    throw new HttpException(401);
  }
});

export default attachUserInfo;
