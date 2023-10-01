import { IToken } from "../../models/token";
import { MongoGetUserAuthRepository } from "../../respositories/get-user-auth/mongo-get-user-auth";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { LoginUserParams } from "./protocols";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class LoginUserController implements Icontroller {
  constructor(
    private readonly getUserAuthRepository: MongoGetUserAuthRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<LoginUserParams>
  ): Promise<HttpResponse<IToken | string>> {
    try {
      console.log({ body: httpRequest });
      const { email, password } = httpRequest.body!;

      if (!email) {
        return badRequest("Email is mandatory!");
      }

      if (!password) {
        return badRequest("The password is mandatory!");
      }

      const user = await this.getUserAuthRepository.findByEmail(
        httpRequest.body!.email
      );

      if (!user) {
        return badRequest("User not Found");
      }

      const checkPassword = await bcrypt.compare(
        httpRequest.body!.password,
        user.password
      );

      if (!checkPassword) {
        return badRequest("Invalid credentials");
      }

      const secret = process.env.SECRET ?? "";

      const token = jwt.sign(
        {
          id: user.id
        },
        secret
      );

      return ok<IToken>(token);
    } catch (error) {
      console.log(error);
      return serverError("05");
    }
  }
}
