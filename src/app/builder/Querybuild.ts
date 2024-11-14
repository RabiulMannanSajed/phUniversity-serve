import { FilterQuery, Query } from 'mongoose';

class QueryBuild<T> {
  public modelQuery: Query<T[], T>; // this is for model
  public query: Record<string, unknown>; // this is the data of the model

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableField: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableField.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]); // this will do the exitly match

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
}
