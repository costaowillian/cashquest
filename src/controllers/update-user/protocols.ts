import { HttpRequest } from './../protocols';
import { User } from "../../models/user";
import { HttpResponse } from '../protocols';

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
}

export interface IUpdateUserController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}
export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}