import { Model, PaginateModel } from 'mongoose';
import catchAsync from '../util/catchAsync';
import * as repositoryService from '../services/repository.service';
import AppError from '../util/error';

export const getOne = (model: Model<any, {}, {}>) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new AppError('Missing id param!', 400));
    }

    let data = await repositoryService.findOne(model, { _id: id });

    if (!data) {
      return next(new AppError('Record not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    });
  });

export const getAll = (model:PaginateModel<any, {}, {}>) =>
  catchAsync(async (req, res, next) => {
    const { page, size, select, sort, order } = req.query;
    let name;
    if (req.query.name)
        name = req.query.name;

    const data = await repositoryService.paginate(model, { page, size, select, sort, order });

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