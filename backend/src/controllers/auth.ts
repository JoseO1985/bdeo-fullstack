import { NextFunction, Request, Response } from 'express';
import catchAsync from '../util/catchAsync';
import AppError from '../util/error';
import { User } from '../models/User';

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return next(new AppError('Email already exists', 400));

  const savedUser = await user.save();

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
  const user = await User.findOne({ email }).select('+password');
  console.log({ user });
  if (!user || !user.comparePassword(password)) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = user.generateToken();

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
});
