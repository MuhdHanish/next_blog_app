import { PrismaClient } from "@prisma/client";
import { FindPostByIdUseCase } from "./FindPostByIdUseCase";
import { FindPostByIdController } from "./FindPostByIdController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoPostsRepository } from "@/lib/respositories/posts/implementations/PrismaMongoPostsRepository";

const prismaClient = new PrismaClient();

const postsRepository = new PrismaMongoPostsRepository(prismaClient.post);

const findPostByIdUseCase = new FindPostByIdUseCase(postsRepository);
const responseHandler = new NextResponseHandler();

const findPostByIdController = new FindPostByIdController(findPostByIdUseCase, responseHandler);

export { findPostByIdUseCase, findPostByIdController };