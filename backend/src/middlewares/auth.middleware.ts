import { Request, Response, NextFunction } from 'express';
import AppError from '../util/error';
import catchAsync from '../util/catchAsync';
import { User } from '../models/user';
const jwt = require('jsonwebtoken');


const getToken = (req: Request) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    }
    return token;
}

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = getToken(req);
    if (!token) {
      return next(
        new AppError('Missing token', 401)
      );
    }
  
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
      return next(
        new AppError(
          'User no longer exist.',
          401
        )
      );
    }
  
    res.locals.user = currentUser;
    next();
  });