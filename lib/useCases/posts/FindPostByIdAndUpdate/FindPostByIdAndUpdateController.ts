import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";
import { FindPostByIdAndUpdateUseCase } from "./FindPostByIdAndUpdateUseCase";

export class FindPostByIdAndUpdateController {
  constructor(
    private readonly useCase: FindPostByIdAndUpdateUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response, params: { id: string }) {
    try {
      const { id } = params;
      if (!id) return this.responseHandler.customHandler("Post id is required", null, 400);
      const body = await req.json();
      if (!body) {
        return this.responseHandler.customHandler(
          "Request body is empty",
          null,
          400
        );
      }
      const { title, content, thumbnail, publicId, categoryTitle, links } = body;
      if (!title || !content) {
        return this.responseHandler.customHandler(
          [
            "title should be an string",
            "title should not be empty",
            "content should be an string",
            "content should not be empty",
          ],
          null,
          400
        );
      }
      const authorEmail = `muhammedhanish11@gmail.com`;
      const post = await this.useCase.execute(id, { title, content, thumbnail, publicId, categoryTitle, links, authorEmail });
      if (!post) return this.responseHandler.notFoundHandler("No post found for the provided id");
      return this.responseHandler.noContentHandler("Updation successful");
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
