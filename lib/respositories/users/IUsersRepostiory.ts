export interface IUsersRepository {
  findUserWithPostsByEmail: (email: string) => Promise<any>;
}