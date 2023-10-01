import { IToken } from "../../models/token";

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface ILoginUserRepository {
    login(data : LoginUserParams) : Promise<IToken>;
}