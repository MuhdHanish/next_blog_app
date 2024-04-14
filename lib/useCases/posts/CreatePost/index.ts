import { PrismaClient } from "@prisma/client";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { CreatePostController } from "./CreatePostController";
import { PrismaMongoPostsRepository } from "@/lib/respositories/posts/implementations/PrismaMongoPostsRepository";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";

const prismaClient = new PrismaClient();

const postsRepository = new PrismaMongoPostsRepository(prismaClient.post);

const createPostUseCase = new CreatePostUseCase(postsRepository);
const responseHandler = new NextResponseHandler();

const createPostController = new CreatePostController(createPostUseCase, responseHandler);

export { createPostUseCase, createPostController };