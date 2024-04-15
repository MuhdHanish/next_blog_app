import { findPostByIdController } from "@/lib/useCases/posts/FindPostById";
import { findPostByIdAndUpdateController } from "@/lib/useCases/posts/FindPostByIdAndUpdate";

type TRequestParams = {
    id: string 
}

export const GET = async (
  req: Request,
  { params }: { params: TRequestParams },
  res: Response
) => findPostByIdController.handle(req, res, params);

export const PUT = async (
  req: Request,
  { params }: { params : TRequestParams },
  res: Response
) => findPostByIdAndUpdateController.handle(req, res, params);
