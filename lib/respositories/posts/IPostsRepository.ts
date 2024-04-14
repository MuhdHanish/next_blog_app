export interface IPostsRepository {
  createPost: (post: any) => Promise<any>;
}