import { FilterQuery, PaginateModel, Document, Model } from 'mongoose';
import { Beer } from '../models/beer';
import { getPagination } from '../util/query';

export const paginate = (
  model: PaginateModel<any, {}, {}>,
  page?: string,
  size?: string,
  select?: string | string[],
  filter: FilterQuery<any> = {}
) => {
  const { limit, offset } = getPagination(page, size);
  return model.paginate(filter, { offset, limit, select });
};

export const getOne = (id: string, model: Model<any, {}, {}>) => {
  return model.findOne({ _id: id });
};

export const findOne = (model: Model<any, {}, {}>, query: FilterQuery<Document>) => {
  return model.findOne(query);
};
