import { Router } from 'express';
import * as authController from '../controllers/auth';

export const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
