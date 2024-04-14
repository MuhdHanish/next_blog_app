export interface ICategoriesRepository {
  findCategories: () => Promise<any>;
}