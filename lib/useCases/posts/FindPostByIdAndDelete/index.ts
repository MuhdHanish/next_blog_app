import { PrismaClient } from "@prisma/client";
import { FindPostByIdAndDeleteUseCase } from "./FindPostByIdAndDeleteUseCase";
import { FindPostByIdAndDeleteController } from "./FindPostByIdAndDeleteController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoPostsRepository } from "@/lib/respositories/posts/implementations/PrismaMongoPostsRepository";

const prismaClient = new PrismaClient();

const postsRepository = new PrismaMongoPostsRepository(prismaClient.post);

const findPostByIdAndDeleteUseCase = new FindPostByIdAndDeleteUseCase(postsRepository);
const responseHandler = new NextResponseHandler();

const findPostByIdAndDeleteController = new FindPostByIdAndDeleteController(findPostByIdAndDeleteUseCase, responseHandler);

export { findPostByIdAndDeleteUseCase, findPostByIdAndDeleteController };