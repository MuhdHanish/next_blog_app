import { findUserWithPostsByEmailController } from "@/lib/useCases/users/FindUserWithPostsByEmail";

type TRequestParams = {
  email: string;
};

export const GET = async (
  req: Request,
  { params }: { params: TRequestParams },
  res: Response
) => findUserWithPostsByEmailController.handle(req, res, params);
