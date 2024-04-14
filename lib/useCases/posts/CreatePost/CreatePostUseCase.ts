import { IPostsRepository } from "@/lib/respositories/posts/IPostsRepository";

export class CreatePostUseCase {

  constructor(private readonly postsRepository: IPostsRepository) { };
  
  async execute(postData: any) {
    const post = await this.postsRepository.createPost(postData);
    return post;
  }
}