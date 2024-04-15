import { FindPostByIdAndDeleteUseCase } from "./FindPostByIdAndDeleteUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class FindPostByIdAndDeleteController {
  constructor(
    private readonly useCase: FindPostByIdAndDeleteUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response, params: { id: string }) {
    try {
      const { id } = params;
      if (!id) return this.responseHandler.customHandler("Post id is required", null, 400);
      const post = await this.useCase.execute(id);
      if (!post) return this.responseHandler.notFoundHandler("No post found for the provided id");
      return this.responseHandler.noContentHandler("Deletion successful");
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}