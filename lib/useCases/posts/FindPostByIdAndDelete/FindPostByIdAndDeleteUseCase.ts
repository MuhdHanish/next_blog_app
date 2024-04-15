import { IPostsRepository } from "@/lib/respositories/posts/IPostsRepository";

export class FindPostByIdAndDeleteUseCase {
  constructor(private readonly repository: IPostsRepository) { };
  async execute(id: string) {
    const post = await this.repository.findPostByIdAndDelete(id);
    return post;
  }

}