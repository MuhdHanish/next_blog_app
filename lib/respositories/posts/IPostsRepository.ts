export interface IPostsRepository {
  findPosts: () => Promise<any>;
  findPostById: (id: string) => Promise<any>;
  createPost: (post: any) => Promise<any>;
}