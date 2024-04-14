import { FindCategoriesUseCase } from "./FindCategoriesUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class FindCategoriesController {
  constructor(
    private readonly useCase: FindCategoriesUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const categories = await this.useCase.execute();
      return this.responseHandler.successHandler(categories);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
