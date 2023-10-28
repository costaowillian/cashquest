import { ObjectId } from "mongodb";
import { IDeposit } from "../../../models/deposit";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { CreateDepositParams, ICreateDepositRepository } from "./protocols";

export class CreateDepositController implements Icontroller {
  constructor(
    private readonly createDepositRepository: ICreateDepositRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateDepositParams>
  ): Promise<HttpResponse<IDeposit | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Body");
      }

      const requiredFields = [
        "_userId",
        "category",
        "value",
        "isFixed",
        "createAt"
      ];

      for (const field of requiredFields) {
        const fieldValue =
          httpRequest.body?.[field as keyof CreateDepositParams];

        if (
          fieldValue === undefined ||
          (typeof fieldValue === "string" && !fieldValue.trim())
        ) {
          return badRequest(`Field ${field} is required`);
        }
      }

      httpRequest.body!._userId = new ObjectId(httpRequest.body!._userId);

      const deposit = await this.createDepositRepository.createDeposit(
        httpRequest.body!
      );

      return created<IDeposit>(deposit);
    } catch (error) {
      return serverError("12");
    }
  }
}
