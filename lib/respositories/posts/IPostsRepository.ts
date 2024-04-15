export interface IPostsRepository {
  findPosts: () => Promise<any>;
  createPost: (post: any) => Promise<any>;
  findPostById: (id: string) => Promise<any>;
  findPostByIdAndUpdate: (id: string, post: any) => Promise<any>;
}