import { IPostsRepository } from "@/lib/respositories/posts/IPostsRepository";

export class FindPostsUseCase {
  constructor(private readonly repository: IPostsRepository) { };
  async execute() {
    const posts = await this.repository.findPosts();
    return posts;
  }

}