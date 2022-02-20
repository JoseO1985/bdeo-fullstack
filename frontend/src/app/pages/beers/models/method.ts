import { Measure } from './ingredient';

export interface Method {
  mash_temp: {
    temp: Measure;
    duration: number;
  }[];
  fermentation: {
    temp: Measure;
  };
  twist: string;
}
