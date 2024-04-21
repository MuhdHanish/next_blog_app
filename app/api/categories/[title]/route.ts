import { findCategoryWithPostsByTitleController } from "@/lib/useCases/categories/FindCategoryWithPostsByTitle";

type TRequestParams = {
  title: string;
};

export const GET = async (
  req: Request,
  { params }: { params: TRequestParams },
  res: Response
) => findCategoryWithPostsByTitleController.handle(req, res, params);
