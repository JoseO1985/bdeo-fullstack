import { User } from '../models/user';
import * as repositoryService from './repository.service';

export const signup = async (name: string, email: string, password: string) => {
  const user = new User({
    name: name,
    email: email,
    password: password
  });

  const existingUser = await repositoryService.findOne(User, { email: user.email });
  if (existingUser) return;
  return repositoryService.create(User, user);
};

export const signin = async (email: string, password: string) => {
  const user = await repositoryService.findOne(User, { email }).select('+password');
  if (!user || !user.comparePassword(password)) return;
  const token = user.generateToken();
  return {user, token};
};
