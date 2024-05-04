import { TRequestProps } from "@/types";

class Fetch {
  private static async handleResponse(
    { response, returnType, keyName}:
    { response: Response, returnType: "array" | "object", keyName?: string}
  ) {
    const responseData = await response.json();
    let responseDataItem = keyName ? responseData?.data?.[keyName] : responseData.data;

    if (responseDataItem === undefined) {
      const keyErrorMessage = keyName ? `The key "${keyName}" was not found in the response data` : 'Data not found in the response';
      throw new Error(`Invalid data format\n${keyErrorMessage}: ${JSON.stringify(responseData, null, 2)}`);
    }

    const receivedType = Array.isArray(responseDataItem) ? "array" : "object";
    if (receivedType !== returnType) {
      const typeErrorMessage = keyName ? `for ${keyName}` : '';
      throw new Error(`Invalid data format\nExpected ${returnType === "array" ? "an array" : "an object"} ${typeErrorMessage}, but received: ${JSON.stringify(responseDataItem, null, 2)}`);
    }

    return responseDataItem;
  }

  async request(
    { method, url, isClient, data, setError, keyName, returnType }: TRequestProps
  ) {
  try {
    const normalizeUrl = url.startsWith("/") ? url.slice(1) : url;
    const apiUrl = isClient ? `/api/${normalizeUrl}` : `${process.env.NEXTAUTH_URL}/api/${normalizeUrl}`;
    const options: RequestInit = {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(apiUrl, options);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
    }
    if (returnType) return Fetch.handleResponse({ response, returnType, keyName });
    return;
  } catch (error) {
    setError && setError(`The server may be experiencing issues. Please try again later.`);
    throw error;
  }
  }
}

export const { request } = new Fetch();
