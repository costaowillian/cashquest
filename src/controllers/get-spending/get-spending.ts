import { ISpending } from "./../../models/spending";
import { badRequest, notFound, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { IGetSpendingRepository } from "./protocols";

export class GetSpendingController implements Icontroller {
  constructor(private readonly getSpendingRepository: IGetSpendingRepository) {}
  async handle(
    httpRequest: HttpRequest<ISpending>
  ): Promise<HttpResponse<ISpending | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing id");
      }

      const spending = await this.getSpendingRepository.getSpending(id);

      if (!spending) {
        return notFound("Spending not found");
      }
      return ok<ISpending>(spending);
    } catch (error) {
      return serverError("08");
    }
  }
}
