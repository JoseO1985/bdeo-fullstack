import { User } from '../models/user';
import * as factoryController from './factory.controller';


export const getAllUsers = factoryController.getAll(User);
export const getUser = factoryController.getOne(User);
