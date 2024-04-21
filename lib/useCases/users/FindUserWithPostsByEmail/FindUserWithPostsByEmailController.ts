import { IResponseHandler } from "@/lib/providers/responseHandler/IResponseHandler";
import { FindUserWithPostsByEmailUseCase } from "./FindUserWithPostsByEmailUseCase";

export class FindUserWithPostsByEmailController {
  constructor(
    private readonly useCase: FindUserWithPostsByEmailUseCase,
    private readonly responseHandler: IResponseHandler
  ) {}
  async handle(req: Request, res: Response, params: { email: string }) {
    try {
      const { email } = params;
      if (!email) return this.responseHandler.customHandler("User email is required", null, 400);
      const user = await this.useCase.execute(email);
      if (!user) return this.responseHandler.notFoundHandler("No user found for the provided email");
      return this.responseHandler.successHandler(user);
    } catch (error) {
      return this.responseHandler.serverErrorHandler(error);
    }
  }
}
