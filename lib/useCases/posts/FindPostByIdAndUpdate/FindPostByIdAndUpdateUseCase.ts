import { IPostsRepository } from "@/lib/respositories/posts/IPostsRepository";

export class FindPostByIdAndUpdateUseCase {
  constructor(private readonly repository: IPostsRepository) { };
  async execute(id: string, postData: any) {
    const post = await this.repository.findPostByIdAndUpdate(id, postData);
    return post;
  }

}