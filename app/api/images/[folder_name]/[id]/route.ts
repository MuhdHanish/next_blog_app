import { deleteImageByIdController } from "@/lib/useCases/images/DeleteImageById";

type TRequestParams = {
  folder_name: string;
  id: string;
};

export const DELETE = async (
  req: Request,
  { params }: { params: TRequestParams },
  res: Response
) => deleteImageByIdController.handle(req, res, params);
