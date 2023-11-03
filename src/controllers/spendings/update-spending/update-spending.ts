import { ISpending } from "../../../models/spending";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IUpdateSpendingRepository, UpdateSpendingParams } from "./protocols";

export class UpdateSpendingController implements Icontroller {
  constructor(
    private readonly updateSpendingRepository: IUpdateSpendingRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateSpendingParams>
  ): Promise<HttpResponse<ISpending | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing spending id");
      }

      const AllowedToUpdate: (keyof UpdateSpendingParams)[] = [
        "category",
        "description",
        "value",
        "attachment",
        "isFixed",
        "comments",
        "isTransferred",
        "installments"
      ];

      const someFieldsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !AllowedToUpdate.includes(key as keyof UpdateSpendingParams)
      );

      if (someFieldsNotAllowedToUpdate) {
        return badRequest("Some received fields is not allowed");
      }

      const updatedbody = { ...body };
      const paramToRemove = "userId";
      delete updatedbody[paramToRemove];

      const spending = await this.updateSpendingRepository.updateSpending(
        id,
        updatedbody
      );

      return ok<ISpending>(spending);
    } catch (error) {
      return serverError("10");
    }
  }
}
