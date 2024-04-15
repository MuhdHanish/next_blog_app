export interface IResponseHandler {
  successHandler: (data: any) => void;
  createHandler: (data: any) => void;
  notFoundHandler: (message: string) => void;
  serverErrorHandler: (error: any) => void;
  customHandler: (message: string | string[], data: any , status: number) => void;
}