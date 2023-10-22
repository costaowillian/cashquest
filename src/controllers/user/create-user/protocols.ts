import { User } from "../../../models/user";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

export interface IGetUsersAuthRepository {
  findByEmail(email: string): Promise<User | null>;
}
