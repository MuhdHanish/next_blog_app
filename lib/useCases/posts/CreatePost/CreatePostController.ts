import { getServerSession } from "next-auth/next";
import { CreatePostUseCase } from "./CreatePostUseCase";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class CreatePostController {
  constructor(
    private readonly useCase: CreatePostUseCase,
    private readonly responseHandler: IResponseHandler
  ) { }
  async handle(req: Request, res: Response) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) return this.responseHandler.unAuthenticatedHandler();
      const body = await req.json();
      if (!body) return this.responseHandler.customHandler("Request body is empty", null, 400 );
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
      const authorEmail = session?.user?.email as string;
      const post = await this.useCase.execute({
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
