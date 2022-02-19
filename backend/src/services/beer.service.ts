import { FilterQuery } from 'mongoose';
import { Ingredient } from '../interfaces/ingredient';
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
const isPrefix = (prefix: string, str: string) => str.toLowerCase().includes(prefix);
const prefixPositionInArray = (prefix: string, ingredients: Ingredient[]) => ingredients.findIndex(ingred => isPrefix(prefix, ingred.name));

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
  return autocompleteResult(beer, normalizedName);
};

const autocompleteResult = (beer: BeerDocument, normalizedName: string) => {
  if (beer){
    if (isPrefix(normalizedName, beer.name))
      return { beer: beer.name };
    
    const maltPrefixPosition = prefixPositionInArray(normalizedName, beer.ingredients.malt);
    if (maltPrefixPosition !== -1)
      return { malt: beer.ingredients.malt[maltPrefixPosition].name} ;

    const hopsPrefixIndex = prefixPositionInArray(normalizedName, beer.ingredients.hops);
    if (hopsPrefixIndex !== -1)
      return { hops: beer.ingredients.hops[hopsPrefixIndex].name };

    if (isPrefix(normalizedName, beer.ingredients.yeast))
      return { yeast: beer.ingredients.yeast };

  } 
  return '';
}

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

const getMaltHopsPipeline = () => [
  {
    $project: {
      items: { $concatArrays: ['$ingredients.malt', '$ingredients.hops'] }
    }
  },
  { $unwind: '$items' },
  { $sortByCount: '$items.name' },
  { $limit: 10 },
  { $project: { count: 1 } }
  
];

const getYeastPipeline = () => [
  {
    $project: {
      items: '$ingredients.yeast'
    }
  },
  { $unwind: '$items' },
  { $sortByCount: '$items' },
  { $limit: 10 },
  { $project: { count: 1 } }
];

export const mostRepeatedIngredients = (limit: number = 10) => {
  return Beer.aggregate([
    {
      $facet: {
        maltHops: getMaltHopsPipeline(),
        yeast: getYeastPipeline()
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
