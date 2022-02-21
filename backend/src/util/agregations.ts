export const getMaltHopsPipeline = (limit: number) => [
  {
    $project: {
      items: { $concatArrays: ['$ingredients.malt', '$ingredients.hops'] }
    }
  },
  { $unwind: '$items' },
  { $sortByCount: '$items.name' },
  { $limit: limit },
  { $project: { count: 1 } }
  
];

export const getYeastPipeline = (limit: number) => [
  {
    $project: {
      items: '$ingredients.yeast'
    }
  },
  { $unwind: '$items' },
  { $sortByCount: '$items' },
  { $limit: limit },
  { $project: { count: 1 } }
];

export const splitAndConvertAgregation = (field: string, position: number, separator = "/", to = "int") => ({
    $convert: {
        input: {
          $arrayElemAt: [
            {
              $split: [
                "$"+field,
                separator
              ]
            },
            position
          ]
        },
        to: to
      }
});