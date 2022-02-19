import { Router } from 'express';
import { authRouter } from './auth.route';
import { beerRouter } from './beer.route';

export const mainRouter = Router();

mainRouter.get('/', (_, res) => {
  res.json({ res: 'hello world' });
});

mainRouter.use('/api/auth', authRouter);
mainRouter.use('/api/beers', beerRouter);