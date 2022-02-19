import mongoose from 'mongoose';
import environment from '../config/environment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  comparePassword: comparePasswordFunction;
  generateToken: generateTokenFunction;
};

type comparePasswordFunction = (password: string) => boolean;
type generateTokenFunction = (expiresIn?: string) => string;

export const generateToken: generateTokenFunction = function (expiresIn: string = environment.secretExpiration) {
  return jwt.sign({ _id: this._id }, environment.secret, { expiresIn });
};

export const comparePassword: comparePasswordFunction = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};
