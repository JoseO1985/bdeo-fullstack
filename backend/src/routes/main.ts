import { Router } from 'express';
import { authRouter } from './auth';

export const mainRouter = Router();

mainRouter.get('/', (_, res) => {
  res.json({ res: 'hello world' });
});

mainRouter.use('/api/auth', authRouter);
