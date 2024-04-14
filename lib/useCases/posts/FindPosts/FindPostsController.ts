import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";
import { FindPostsUseCase } from "./FindPostsUseCase";

export class FindPostsController {
  constructor(
    private readonly useCase: FindPostsUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const post = await this.useCase.execute();
      return this.responseHandler.successHandler(post);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
