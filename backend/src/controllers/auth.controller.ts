import { NextFunction, Request, Response } from 'express';
import catchAsync from '../util/catchAsync';
import AppError from '../util/error';
import * as authService from '../services/auth.service';

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Missing parameters!', 400));
  }

  const savedUser = await authService.signup(name, email, password);
  if (!savedUser) return next(new AppError('Email already exists', 400));

  res.status(201).json({
    status: 'success',
    data: {
      user: savedUser
    }
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const userInfo = await authService.signin(email, password);
  if (!userInfo) return next(new AppError('Incorrect email or password!', 401));

  res.status(200).json({
    status: 'success',
    data: {
      ...userInfo
    }
  });
});
