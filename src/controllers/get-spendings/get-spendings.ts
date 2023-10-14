import { ISpending } from "../../models/spending";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { GetSpendingParams, IGetSpendingsRepository } from "./protocols";

export class GetSpendingsController implements Icontroller {
  constructor(
    private readonly getSpendingsRepository: IGetSpendingsRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<GetSpendingParams>
  ): Promise<HttpResponse<ISpending[] | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing id");
      }

      const spending = await this.getSpendingsRepository.getSpendingByUserId(
        httpRequest.params
      );

      if (!spending) {
        throw new Error("user has no spendings");
      }

      return ok<ISpending[]>(spending);
    } catch (error) {
      return serverError("06");
    }
  }
}
