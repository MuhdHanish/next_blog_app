import { ICategoriesRepository } from "@/lib/respositories/categories/ICategoriesRepository";

export class FindCategoryWithPostsByTitleUseCase {
  constructor(private readonly repository: ICategoriesRepository) { };
  async execute(title: string) {
    const category = await this.repository.findCategoryWithPostsByTitle(title);
    return category;
  }

}