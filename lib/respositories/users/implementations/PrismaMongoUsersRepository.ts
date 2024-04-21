import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepostiory";

export class PrismaMongoUsersRepository implements IUsersRepository {
  constructor(private readonly userModel: PrismaClient["user"]) {}

  async findUserWithPostsByEmail(email: string) {
    try {
      const user = await this.userModel.findUnique({
        where: { email },
        include: { posts: { orderBy: { createdAt: "desc" } } }
      });
      return user;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : `Error on finding user with posts by email`
      );
    }
  }
}
