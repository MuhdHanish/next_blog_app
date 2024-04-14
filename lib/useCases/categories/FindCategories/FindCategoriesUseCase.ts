import { ICategoriesRepository } from "@/lib/respositories/categories/ICategoriesRepository";


export class FindCategoriesUseCase {
  constructor(private readonly repository: ICategoriesRepository) { };
  
  async execute() {
    const categories = await this.repository.findCategories();
    return categories;
  }

}