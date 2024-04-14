import { IPostsRepository } from "@/lib/respositories/posts/IPostsRepository";

export class FindPostByIdUseCase {
  constructor(private readonly repository: IPostsRepository) { };
  async execute(id: string) {
    const posts = await this.repository.findPostById(id);
    return posts;
  }

}