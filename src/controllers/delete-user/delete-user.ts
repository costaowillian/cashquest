import { User } from "../../models/user";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements Icontroller {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      console.log(id);
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id"
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);
      return {
        statusCode: 200,
        body: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something Went Wrong. Internal Code 04" + error
      };
    }
  }
}
