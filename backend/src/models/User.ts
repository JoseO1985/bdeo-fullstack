import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { comparePassword, generateToken, UserDocument } from '../interfaces/user';

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

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.generateToken = generateToken;

export const User = mongoose.model<UserDocument>('User', userSchema);
