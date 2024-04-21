import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FindPostByIdAndDeleteUseCase } from "./FindPostByIdAndDeleteUseCase";
import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";

export class FindPostByIdAndDeleteController {
  constructor(
    private readonly useCase: FindPostByIdAndDeleteUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response, params: { id: string }) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) return this.responseHandler.unAuthenticatedHandler();
      const { id } = params;
      if (!id) return this.responseHandler.customHandler("Post id is required", null, 400);
      const post = await this.useCase.execute(id);
      if (!post) return this.responseHandler.notFoundHandler("No post found for the provided id");
      return this.responseHandler.customHandler("Deletion successful", null, 200);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
