import { findCategoriesController } from "@/lib/useCases/categories/FindCategories";

export const GET = async (req: Request, res: Response) => findCategoriesController.handle(req, res);