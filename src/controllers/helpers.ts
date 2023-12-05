import { HttpResponse, httpStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.OK,
    body: body
  };
};

export const formatDate = (date: Date): string => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1;
  const paddedMonth = month < 10 ? `0${month}` : month;
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  const newDate = `${date.getFullYear()}-${paddedMonth}-${day} ${hours}:${minutes}:${seconds}`;
  return newDate;
};

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
