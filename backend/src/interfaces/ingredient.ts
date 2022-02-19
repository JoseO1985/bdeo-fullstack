export interface Measure {
  value: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  amount: Measure;
  add?: string;
  attribute?: string;
}
