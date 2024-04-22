import { DeleteImageByIdUseCase } from "./DeleteImageByIdUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class DeleteImageByIdController {
  constructor(
    private readonly useCase: DeleteImageByIdUseCase,
    private readonly responseHandler: IResponseHandler
  ) { }

  async handle(req: Request, res: Response, params: { folder_name: string, id: string }) {
    try {
      const { folder_name, id } = params;
      if (!id) return this.responseHandler.customHandler("Image id (public id) is required", null, 400);
      await this.useCase.execute(folder_name, id);
      return this.responseHandler.customHandler("Deletion successful", null, 200);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
