export const getPagination = (page, size) => {
  const limit = size ? +size : Number.MAX_SAFE_INTEGER;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

export const regexQuery = (field: string, value: string) => ({ [field]: { $regex: new RegExp(value), $options: 'i' } });
