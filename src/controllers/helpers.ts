import { HttpResponse, httpStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.OK,
    body: body
  };
};

export const formatDate = (date: Date): string => {
  const newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return newDate;
}

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.CREATED,
    body: body
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: message
  };
};

export const notFound = (message: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.NOTFOUND,
    body: message
  };
};

export const serverError = (code: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.SERVER_ERROR,
    body: "something went wrong. internal code: " + code
  };
};

