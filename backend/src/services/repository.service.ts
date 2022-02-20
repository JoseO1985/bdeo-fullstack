import { FilterQuery, PaginateModel, Document, Model } from 'mongoose';

export const getPagination = (page, size) => {
  const limit = size ? +size : Number.MAX_SAFE_INTEGER;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

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

export const findOne = (model: Model<any, {}, {}>, query: FilterQuery<Document>) => {
  return model.findOne(query);
};

export const create = (model: Model<any, {}, {}>, document: any) => {
  return model.create(document);
};
