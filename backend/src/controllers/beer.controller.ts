import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import * as repositoryService from '../services/repository.service';
import * as beerService from '../services/beer.service';
import AppError from '../util/error';

export const all = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { page, size, name, select } = req.query;

  const data = await beerService.filterByName(
    name as string,
    page as string,
    size as string,
    select as string | string[]
  );

  res.status(200).json({
    status: 'success',
    data: {
      totalItems: data.totalDocs,
      beers: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1
    }
  });
});

export const getBeer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const beerId = req.params.beerId;

  if (!beerId) {
    return next(new AppError('Missing beer id!', 400));
  }
  const beer = await repositoryService.getOne(beerId, beerService.model);
  res.status(200).json({
    status: 'success',
    data: {
      beer
    }
  });
});

export const autocompleteName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const name = req.params.name;

  if (!name) {
    return next(new AppError('Missing autocomplete name!', 400));
  }
  const beer = await beerService.autocompleteName(name);
  res.status(200).json({
    status: 'success',
    data: {
      beer
    }
  });
});

export const getMostRepeated = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const ingredients = await beerService.mostRepeatedIngredients();
  res.status(200).json({
    status: 'success',
    data: {
      ingredients: ingredients.length > 0 ? ingredients[0].result : []
    }
  });
});
