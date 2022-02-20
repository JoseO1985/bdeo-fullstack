import { FilterQuery, Document } from 'mongoose';

export class QueryFilterBuilder {
    private filterResult: FilterQuery<Document>[] = [];
  
    setRegexFilter(fieldPath: string, value: string) {
        console.log(value)
      if (fieldPath && value) {
        this.filterResult.push({ [fieldPath]: { $regex: new RegExp(value), $options: 'i' } });
      }
      return this;
    }
  
    build(logicalOperator: '$or' | '$and') {
      return this.filterResult.length > 0 ? ({ [logicalOperator]: this.filterResult }) : {};
    }
  }