import { IPostsRepository } from "../IPostsRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaMongoPostsRepository implements IPostsRepository {

  constructor(private readonly postModel: PrismaClient["post"]) { };
  
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
