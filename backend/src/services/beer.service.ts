import { Ingredient } from '../interfaces/ingredient';
import { BeerDocument } from '../interfaces/beer';
import { Beer } from '../models/beer';
import * as repositoryService from './repository.service';
import { QueryFilterBuilder } from './query-filter-builder.service';

function composeQuery(name: string, queryFilterBuilder: QueryFilterBuilder) {
  return queryFilterBuilder
  .setRegexFilter('name', name)
  .setRegexFilter('ingredients.malt.name', name)
  .setRegexFilter('ingredients.hops.name', name)
  .setRegexFilter('ingredients.yeast', name)
  .build('$or');
}

const isPrefix = (prefix: string, str: string) => str.toLowerCase().includes(prefix);
const prefixPositionInArray = (prefix: string, ingredients: Ingredient[]) => ingredients.findIndex(ingred => isPrefix(prefix, ingred.name));

export const filterByName = (data: { name: string, page: string, size: string, select: string | string[] }, queryFilterBuilder: QueryFilterBuilder) => {
  const { name, page, size, select } = data;

  const composedOrQuery = composeQuery(name, queryFilterBuilder);

  return repositoryService.paginate(Beer, page, size, select, composedOrQuery);
};

export const autocompleteName = async (name: string, queryFilterBuilder: QueryFilterBuilder) => {
  const normalizedName = name.toLowerCase();
  
  const composedOrQuery = composeQuery(name, queryFilterBuilder);

  const beer: BeerDocument = await repositoryService.findOne(Beer, composedOrQuery);
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