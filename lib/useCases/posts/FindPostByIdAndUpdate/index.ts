import { PrismaClient } from "@prisma/client";
import { FindPostByIdAndUpdateUseCase } from "./FindPostByIdAndUpdateUseCase";
import { FindPostByIdAndUpdateController } from "./FindPostByIdAndUpdateController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoPostsRepository } from "@/lib/respositories/posts/implementations/PrismaMongoPostsRepository";

const prismaClient = new PrismaClient();

const postsRepository = new PrismaMongoPostsRepository(prismaClient.post);

const findPostByIdAndUpdateUseCase = new FindPostByIdAndUpdateUseCase(postsRepository);
const responseHandler = new NextResponseHandler();

const findPostByIdAndUpdateController = new FindPostByIdAndUpdateController(findPostByIdAndUpdateUseCase, responseHandler);

export { findPostByIdAndUpdateUseCase, findPostByIdAndUpdateController };