import { FilterQuery } from 'mongoose';
import { BeerDocument } from '../interfaces/beer';
import { Beer } from '../models/beer';
import { regexQuery } from '../util/query';
import * as repositoryService from './repository.service';

const getRegexNameQueries = (name: string) => ({
  beerNameQuery: name ? regexQuery('name', name as string) : {},
  maltNameQuery: name ? regexQuery('ingredients.malt.name', name as string) : {},
  hopsNameQuery: name ? regexQuery('ingredients.hops.name', name as string) : {},
  yeastNameQuery: name ? regexQuery('ingredients.yeast', name as string) : {}
});

const getOrQuery = (queries: FilterQuery<BeerDocument>[]) => ({ $or: queries });
const strStartsWith = (str: string, name: string) => str.toLowerCase().startsWith(name);

export const filterByName = (name: string, page: string, size: string, select: string | string[]) => {
  const queriesByName = getRegexNameQueries(name);
  const composedQueries = getOrQuery(Object.values(queriesByName));

  return repositoryService.paginate(Beer, page, size, select, composedQueries);
};

export const autocompleteName = async (name: string) => {
  const normalizedName = name.toLowerCase();
  const queriesByName = getRegexNameQueries(normalizedName);
  const composedQueries = getOrQuery(Object.values(queriesByName));

const beer: BeerDocument = await repositoryService.findOne(Beer, composedQueries);
console.log({beer})
  //TODO refactor
  if (beer){
    if (beer.name.toLowerCase().startsWith(normalizedName))
      return beer.name;
    
    const maltIndex = beer.ingredients.malt.findIndex(ingred => strStartsWith(ingred.name, normalizedName));
    if (maltIndex !== -1)
      return beer.ingredients.malt[maltIndex].name;

    const hopsIndex = beer.ingredients.hops.findIndex(ingred => strStartsWith(ingred.name, normalizedName));
    if (hopsIndex !== -1)
      return beer.ingredients.hops[hopsIndex].name;

    if (beer.ingredients.yeast.toLowerCase().startsWith(normalizedName))
      return beer.ingredients.yeast;

    return '';
  } 
};

/*export const mostRepeatedIngredients1 = (limit: number = 10) => {
  return Beer.aggregate([
    {
      $project: {
        items: { $concatArrays: ['$ingredients.malt', '$ingredients.hops'] }
      }
    },
    { $unwind: '$items' },
    { $sortByCount: '$items.name' },
    { $limit: 10 },
    { $project: { count: 1 } }
  ]);
};

export const mostRepeatedIngredients2 = (limit: number = 10) => {
  return Beer.aggregate([
    {
      $project: {
        items: '$ingredients.yeast'
      }
    },
    { $unwind: '$items' },
    { $sortByCount: '$items' },
    { $limit: 10 },
    { $project: { count: 1 } }
  ]);
};*/

//TODO refactor
export const mostRepeatedIngredients = (limit: number = 10) => {
  return Beer.aggregate([
    {
      $facet: {
        maltHops: [
          {
            $project: {
              items: { $concatArrays: ['$ingredients.malt', '$ingredients.hops'] }
            }
          },
          { $unwind: '$items' },
          { $sortByCount: '$items.name' },
          { $limit: 10 },
          { $project: { count: 1 } }
          
        ],
        yeast: [
          {
            $project: {
              items: '$ingredients.yeast'
            }
          },
          { $unwind: '$items' },
          { $sortByCount: '$items' },
          { $limit: 10 },
          { $project: { count: 1 } }
        ]
      },
    },
    {
      $project: {
        result: { $concatArrays: ['$maltHops', '$yeast'] }
      }
    },
  { $unwind: '$result' },
  { $sort: {'result.count': -1} }, 
  { $group: {_id: '$_id', 'result': {$push: '$result'}}}, 
  { $project: {'result': '$result'}}
  ]);
};

export const model = Beer;
