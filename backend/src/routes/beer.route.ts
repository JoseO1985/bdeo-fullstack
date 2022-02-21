import { Router } from 'express';
import * as beerController from '../controllers/beer.controller';

export const beerRouter = Router();

beerRouter.get('/', beerController.getAllBeers);
beerRouter.get('/top-ten/', beerController.topTen);
beerRouter.get('/autocomplete/:name', beerController.autocompleteName);
beerRouter.get('/most-repeated', beerController.getMostRepeated);
beerRouter.get('/:id', beerController.getBeer);
