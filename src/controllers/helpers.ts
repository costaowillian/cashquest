import { HttpResponse } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: body
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message
  };
};

export const serverError = (code: string):HttpResponse<string> {
    return {
        statusCode: 500,
        body: "something went wrong. internal code: " + code
    }
}
