import { FindCategoriesUseCase } from "./FindCategoriesUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class FindCategoriesController {
  constructor(
    private readonly findCategoriesUseCase: FindCategoriesUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const categories = await this.findCategoriesUseCase.execute();
      return this.responseHandler.successHandler(categories);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
