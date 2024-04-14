import { findPostByIdController } from "@/lib/useCases/posts/FindPostById";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) => findPostByIdController.handle(req, res, params);
