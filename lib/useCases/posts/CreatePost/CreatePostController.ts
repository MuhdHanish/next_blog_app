
import { CreatePostUseCase } from "./CreatePostUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class CreatePostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly responseHandler: IResponseHandler
  ) { }
  async handle(req: Request, res: Response) {
    try {
      const body = await req.json();
      if (!body) {
        return this.responseHandler.customHandler(
          "Request body is empty",
          null,
          400
        );
      }
      const { title, content, thumbnail, publicId, categoryTitle, links } =
        body;
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
      const post = await this.createPostUseCase.execute({
        title,
        content,
        thumbnail,
        publicId,
        categoryTitle,
        links,
        authorEmail,
      });
      return this.responseHandler.createHandler(post);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
