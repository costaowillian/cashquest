import { HttpRequest } from "./protocols";
export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface Icontroller {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
