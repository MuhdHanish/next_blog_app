import { deleteImageByIdController } from "@/lib/useCases/images/DeleteImageById";

type TRequestParams = {
  id: string;
};

export const DELETE = async (
  req: Request,
  { params }: { params: TRequestParams },
  res: Response
) => deleteImageByIdController.handle(req, res, { folder_name: "post_images" , id: params.id});
