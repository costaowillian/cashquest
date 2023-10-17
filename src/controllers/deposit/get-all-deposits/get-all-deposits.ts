import { IDeposit } from "../../../models/deposit";
import { MongoGetDepositsRepository } from "../../../respositories/deposit/get-all-deposits/mongo-get-all-deposits";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetDepositParams } from "./protocols";

export class GetDepositsContoller implements Icontroller {
  constructor(
    private readonly getDepositsRepository: MongoGetDepositsRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<GetDepositParams>
  ): Promise<HttpResponse<IDeposit | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing Id");
      }

      const deposits = await this.getDepositsRepository.getDeposits(id);

      if (!deposits) {
        return notFound("Not found Deposits");
      }

      return ok<IDeposit>(deposits);
    } catch (error) {
      return serverError("12");
    }
  }
}
