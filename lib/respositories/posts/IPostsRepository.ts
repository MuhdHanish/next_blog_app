export interface IPostsRepository {
  findPosts: () => Promise<any>;
  createPost: (post: any) => Promise<any>;
}