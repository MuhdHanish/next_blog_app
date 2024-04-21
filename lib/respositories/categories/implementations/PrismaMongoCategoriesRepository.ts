import { PrismaClient } from "@prisma/client";
import { ICategoriesRepository } from "../ICategoriesRepository";

export class PrismaMongoCategoriesRepository implements ICategoriesRepository {
  constructor(private readonly categoryModel: PrismaClient["category"]) {}

  async findCategories() {
    try {
      const categories = await this.categoryModel.findMany();
      return categories;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : `Error on finding categories`
      );
    }
  }

  async findCategoryWithPostsByTitle(title: string) {
    try {
      const category = await this.categoryModel.findUnique({
        where: { title },
        include: {
          posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
        },
      });
      return category;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : `Error on finding category with posts by title`
      );
    }
  }
}
