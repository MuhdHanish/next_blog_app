import { IImagesProvider } from "@/lib/providers/imagesProvider/IImagesProvider";

export class DeleteImageByIdUseCase {
  constructor(
    private readonly imagesProvider: IImagesProvider
  ) { }
  
  async execute(folder_name:string, id: string) {
    await this.imagesProvider.deleteImageById(folder_name, id);
  }
}