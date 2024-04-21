import { IUsersRepository } from "@/lib/respositories/users/IUsersRepostiory";

export class FindUserWithPostsByEmailUseCase {
  constructor(private readonly repository: IUsersRepository) { };
  async execute(email: string) {
    const user = await this.repository.findUserWithPostsByEmail(email);
    return user;
  }

}