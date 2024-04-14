import { PrismaClient } from "@prisma/client";
import { FindPostsUseCase } from "./FindPostsUseCase";
import { FindPostsController } from "./FindPostsController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoPostsRepository } from "@/lib/respositories/posts/implementations/PrismaMongoPostsRepository";

const prismaClient = new PrismaClient();

const postsRepository = new PrismaMongoPostsRepository(prismaClient.post);

const findPostsUseCase = new FindPostsUseCase(postsRepository);
const responseHandler = new NextResponseHandler();

const findPostsController = new FindPostsController(findPostsUseCase, responseHandler);

export { findPostsUseCase, findPostsController };