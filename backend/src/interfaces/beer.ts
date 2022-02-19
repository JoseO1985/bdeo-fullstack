import { Document } from 'mongoose';
import { Ingredient, Measure } from './Ingredient';
import { Method } from '../interfaces/method';

export type BeerDocument = Document & {
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volumen: Measure;
  boil_volume: Measure;
  method: Method;
  ingredients: {
    malt: Ingredient[];
    hops: Ingredient[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
};
