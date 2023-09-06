import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUserController implements IGetUsersController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const user = await this.getUserRepository.getUsers();

      return {
        statusCode: 200,
        body: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "something went wrong. Internal code: 01 " + error
      };
    }
  }
}
