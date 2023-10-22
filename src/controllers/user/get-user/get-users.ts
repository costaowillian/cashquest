import { User } from "../../../models/user";
import { ok, serverError } from "../../helpers";
import { HttpResponse, Icontroller } from "../../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUserController implements Icontroller {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const user = await this.getUserRepository.getUsers();

      return ok<User[]>(user);
    } catch (error) {
      return serverError("01");
    }
  }
}
