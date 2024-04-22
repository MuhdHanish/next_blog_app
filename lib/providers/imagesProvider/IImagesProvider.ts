export interface IImagesProvider {
  deleteImageById: (folder_name: string,id: string) => Promise<any>;
}