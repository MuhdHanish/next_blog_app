import { IPostsRepository } from "@/lib/respositories/posts/IPostsRepository";

export class CreatePostUseCase {
  constructor(private readonly repository: IPostsRepository) { };
  async execute(postData: any) {
    const post = await this.repository.createPost(postData);
    return post;
  }
}