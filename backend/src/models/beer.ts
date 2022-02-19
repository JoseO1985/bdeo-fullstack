import { PaginateModel, Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { BeerDocument } from '../interfaces/beer';

const beerSchema = new Schema(
  {
    name: String,
    tagline: String,
    first_brewed: String,
    description: String,
    image_url: String,
    abv: Number,
    ibu: Number,
    target_fg: Number,
    target_og: Number,
    ebc: Number,
    srm: Number,
    ph: Number,
    attenuation_level: Number,
    volumen: {
      value: Number,
      unit: String
    },
    boil_volume: {
      value: Number,
      unit: String
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: Number,
            unit: String
          },
          duration: Number
        }
      ],
      fermentation: {
        temp: {
          value: Number,
          unit: String
        }
      },
      twist: String
    },
    ingredients: {
      malt: [
        {
          name: String,
          amount: {
            value: Number,
            unit: String
          }
        }
      ],
      hops: [
        {
          name: String,
          amount: {
            value: Number,
            unit: String
          },
          add: String,
          attribute: String
        }
      ],
      yeast: String
    },
    food_pairing: [String],
    brewers_tips: String,
    contributed_by: String
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      }
    }
  }
);

beerSchema.plugin(paginate);

export const Beer = model<BeerDocument, PaginateModel<BeerDocument>>('Beer', beerSchema);
