import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import environment from '../config/environment';
import bcrypt from 'bcrypt';

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;

  comparePassword: comparePasswordFunction;
  generateToken: generateTokenFunction;
};

type comparePasswordFunction = (password: string) => boolean;
type generateTokenFunction = (expiresIn?: string) => void;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
      }
    }
  }
);

userSchema.pre('save', async function save(next) {
  const user = this as UserDocument;
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

const generateToken: generateTokenFunction = function (expiresIn: string = environment.secretExpiration) {
  return jwt.sign({ _id: this._id }, environment.secret, { expiresIn });
};

const comparePassword: comparePasswordFunction = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.generateToken = generateToken;

export const User = mongoose.model<UserDocument>('User', userSchema);
