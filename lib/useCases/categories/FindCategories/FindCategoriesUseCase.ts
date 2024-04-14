import { ICategoriesRepository } from "@/lib/respositories/categories/ICategoriesRepository";


export class FindCategoriesUseCase {

  constructor(private readonly categoriesRepository: ICategoriesRepository) { };
  
  async execute() {
    const categories = await this.categoriesRepository.findCategories();
    return categories;
  }

}