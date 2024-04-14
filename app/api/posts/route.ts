import { findPostsController } from "@/lib/useCases/posts/FindPosts";
import { createPostController } from "@/lib/useCases/posts/CreatePost";

export const GET = async (req: Request, res: Response) => findPostsController.handle(req, res);
export const POST = async (req: Request, res: Response) => createPostController.handle(req, res);