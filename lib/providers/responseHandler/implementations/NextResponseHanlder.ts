import { NextResponse } from "next/server";
import { IResponseHandler } from "../IResponseHandler";

export class NextResponseHandler implements IResponseHandler {
  successHandler(data: any = null) {
    const resposeConfig = data ? { message: `OK`, data } : { message: `OK` };
    return NextResponse.json(resposeConfig, {
      status: 200,
    });
  }

  createHandler(data: any = null) {
    const resposeConfig = data ? { message: `OK`, data } : { message: `OK` };
    return NextResponse.json(resposeConfig, {
      status: 201,
    });
  }

  notFoundHandler(message: string) {
    return NextResponse.json(
      { message },
      {
        status: 404,
      }
    );
  }

  serverErrorHandler(error: any) {
    console.error("Internal server error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json(
      { message: `Internal server error`, error: errorMessage },
      {
        status: 500,
      }
    );
  }

  customHandler(message: string | string[], data: any = null, status: number) {
    const resposeConfig = data ? { message, data } : { message };
    return NextResponse.json(resposeConfig, {
      status,
    });
  }
}

