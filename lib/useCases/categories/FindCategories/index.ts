import { PrismaClient } from "@prisma/client";
import { FindCategoriesUseCase } from "./FindCategoriesUseCase";
import { FindCategoriesController } from "./FindCategoriesController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoCategoriesRepository } from "@/lib/respositories/categories/implementations/PrismaMongoCategoriesRepository";

const prismaClient = new PrismaClient();

const categoriesRepository = new PrismaMongoCategoriesRepository(prismaClient.category);

const findCategoriesUseCase = new FindCategoriesUseCase(categoriesRepository);
const responseHandler = new NextResponseHandler();

const findCategoriesController = new FindCategoriesController(findCategoriesUseCase, responseHandler);

export { findCategoriesUseCase, findCategoriesController };