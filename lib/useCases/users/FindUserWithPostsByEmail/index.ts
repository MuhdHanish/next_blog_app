import { PrismaClient } from "@prisma/client";
import { FindUserWithPostsByEmailUseCase } from "./FindUserWithPostsByEmailUseCase";
import { FindUserWithPostsByEmailController } from "./FindUserWithPostsByEmailController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { PrismaMongoUsersRepository } from "@/lib/respositories/users/implementations/PrismaMongoUsersRepository";

const prismaClient = new PrismaClient();

const usersRepository = new PrismaMongoUsersRepository(prismaClient.user);

const findUserWithPostsByEmailUseCase = new FindUserWithPostsByEmailUseCase(usersRepository);
const responseHandler = new NextResponseHandler();

const findUserWithPostsByEmailController = new FindUserWithPostsByEmailController(findUserWithPostsByEmailUseCase, responseHandler);

export { findUserWithPostsByEmailUseCase, findUserWithPostsByEmailController };