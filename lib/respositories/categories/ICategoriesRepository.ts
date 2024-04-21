export interface ICategoriesRepository {
  findCategories: () => Promise<any>;
  findCategoryWithPostsByTitle: (title: string) => Promise<any>;
}