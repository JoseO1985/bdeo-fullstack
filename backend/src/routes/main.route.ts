import { Router } from 'express';
import { authRouter } from './auth.route';
import { beerRouter } from './beer.route';
import * as authMiddleware from '../middlewares/auth.middleware';
import * as httpLoggerMiddleware from '../middlewares/http-logger.middleware';
import { userRouter } from './user.route';

export const mainRouter = Router();

mainRouter.use(httpLoggerMiddleware.log);

mainRouter.get('/', (_, res) => {
  res.json({ res: 'hello world' });
});

mainRouter.use('/api/auth', authRouter);
mainRouter.use('/api/beers', authMiddleware.protect, beerRouter);
mainRouter.use('/api/users', authMiddleware.protect, userRouter);
