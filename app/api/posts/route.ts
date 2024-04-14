import { createPostController } from "@/lib/useCases/posts/CreatePost";

export const POST = async (req: Request, res: Response) => createPostController.handle(req, res);