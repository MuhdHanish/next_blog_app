import { IImagesProvider } from "../IImagesProvider";
import { v2 as cloudinary, ConfigOptions } from "cloudinary";

export class CloudinaryImagesProvider implements IImagesProvider {
  private readonly cloudinaryInstance: typeof cloudinary;

  constructor() {
    this.cloudinaryInstance = cloudinary;
    this.configureCloudinary();
  }

  private configureCloudinary() {
    const config: ConfigOptions = {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
    this.cloudinaryInstance.config(config);
  }

  async deleteImageById(folder_name: string,id: string) {
    try {
      await this.cloudinaryInstance.uploader.destroy(`${folder_name}/${id}`);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : `Error on removing image using public id in cloudinary instance`
      );
    }
  }
}
