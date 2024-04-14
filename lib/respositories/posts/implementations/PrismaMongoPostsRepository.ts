import { IPostsRepository } from "../IPostsRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaMongoPostsRepository implements IPostsRepository {

  constructor(private readonly postModel: PrismaClient["post"]) { };

  async findPosts() {
    try {
      const posts = await this.postModel.findMany({
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "desc" }
      });
      return posts;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : `Error finding posts`);
    }
  }
  
  async createPost(postData: any) {
    try {
      const post = await this.postModel.create({
        data: postData
      });
      return post;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : `Error creating post`);
    }
  }
}
