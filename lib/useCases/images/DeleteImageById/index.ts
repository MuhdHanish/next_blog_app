import { DeleteImageByIdUseCase } from "./DeleteImageByIdUseCase";
import { DeleteImageByIdController } from "./DeleteImageByIdController";
import { NextResponseHandler } from "@/lib/providers/responseHandler/implementations/NextResponseHanlder";
import { CloudinaryImagesProvider } from "@/lib/providers/imagesProvider/implementations/CloudinaryImagesProivder";

const imagesProvider = new CloudinaryImagesProvider();
const responseHandler = new NextResponseHandler();

const deleteImageByIdUseCase = new DeleteImageByIdUseCase(imagesProvider);
const deleteImageByIdController = new DeleteImageByIdController(deleteImageByIdUseCase, responseHandler);

export { deleteImageByIdUseCase, deleteImageByIdController };