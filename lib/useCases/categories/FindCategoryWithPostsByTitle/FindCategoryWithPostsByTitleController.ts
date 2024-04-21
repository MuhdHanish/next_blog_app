import { FindCategoryWithPostsByTitleUseCase } from "./FindCategoryWithPostsByTitleUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class FindCategoryWithPostsByTitleController {
  constructor(
    private readonly useCase: FindCategoryWithPostsByTitleUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response, params: { title: string }) {
    try {
      const { title } = params;
      if (!title) return this.responseHandler.customHandler("Category title is required", null, 400);
      const category = await this.useCase.execute(title);
      if (!category) return this.responseHandler.notFoundHandler("No category found for the provided title");
      return this.responseHandler.successHandler(category);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
