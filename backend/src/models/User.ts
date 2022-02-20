import { PaginateModel, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { comparePassword, generateToken, UserDocument } from '../interfaces/user';
import paginate from 'mongoose-paginate-v2';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Missing name!']
    },
    email: {
      type: String,
      required: [true, 'Missing email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email']
    },
    password: {
      type: String,
      required: [true, 'Missing password'],
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

userSchema.plugin(paginate);

export const User = model<UserDocument, PaginateModel<UserDocument>>('User', userSchema);
