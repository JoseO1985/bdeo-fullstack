import { User } from '../models/user';

export const signup = async (name: string, email: string, password: string) => {
  const user = new User({
    name: name,
    email: email,
    password: password
  });

  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) return;
  return user.save();
};

export const signin = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  console.log({user})
  if (!user || !user.comparePassword(password)) return;
  const token = user.generateToken();
  return {user, token};
};
