import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import * as beerService from '../services/beer.service';
import AppError from '../util/error';
import * as factoryController from '../controllers/factory.controller';
import { Beer } from '../models/beer';
import { QueryFilterBuilder } from '../services/query-filter-builder.service';

export const getAllBeers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const queryFilterBuilder: QueryFilterBuilder = new QueryFilterBuilder();
    
  const data = await beerService.filterByName(
    {
      name: req.query.name as string,
      page: req.query.page as string,
      size: req.query.size as string,
      select: req.query.select as string | string[]
    },
    queryFilterBuilder
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

export const autocompleteName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const name = req.params.name;

  if (!name) {
    return next(new AppError('Missing autocomplete name!', 400));
  }
  const queryFilterBuilder: QueryFilterBuilder = new QueryFilterBuilder();

  const result = await beerService.autocompleteName(name, queryFilterBuilder);
  res.status(200).json({
    status: 'success',
    data: {
      ...result
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

export const getBeer = factoryController.getOne(Beer);

