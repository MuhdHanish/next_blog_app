import { PrismaClient } from "@prisma/client";
import { FindCategoryWithPostsByTitleUseCase } from "./FindCategoryWithPostsByTitleUseCase";
import { FindCategoryWithPostsByTitleController } from "./FindCategoryWithPostsByTitleController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoCategoriesRepository } from "@/lib/respositories/categories/implementations/PrismaMongoCategoriesRepository";

const prismaClient = new PrismaClient();

const categoriesRepository = new PrismaMongoCategoriesRepository(prismaClient.category);

const findCategoryWithPostsByTitleUseCase = new FindCategoryWithPostsByTitleUseCase(categoriesRepository);
const responseHandler = new NextResponseHandler();

const findCategoryWithPostsByTitleController = new FindCategoryWithPostsByTitleController(findCategoryWithPostsByTitleUseCase, responseHandler);

export { findCategoryWithPostsByTitleUseCase, findCategoryWithPostsByTitleController };