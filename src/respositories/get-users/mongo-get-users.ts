import { IGetUsersRepository } from "../../controllers/get-user/protocols";
import { User } from "../../models/user";

export class MongoGetUserRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Willian",
        lastName: "costa",
        email: "willian@mail.com",
        password: "123456"
      }
    ];
  }
}
