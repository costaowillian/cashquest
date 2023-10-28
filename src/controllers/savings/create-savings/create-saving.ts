import { ISaving } from "../../../models/savings";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { CreateSavingParams, ICreateSavingRepository } from "./protocols";
import { badRequest, created, serverError } from "../../helpers";
import { ObjectId } from "mongodb";

export class CreateSavingController implements Icontroller {
  constructor(
    private readonly createSavingRepository: ICreateSavingRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateSavingParams>
  ): Promise<HttpResponse<unknown>> {
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
          httpRequest.body?.[field as keyof CreateSavingParams];

        if (
          fieldValue === undefined ||
          (typeof fieldValue === "string" && !fieldValue.trim())
        ) {
          return badRequest(`Field ${field} is required`);
        }
      }

      httpRequest.body!._userId = new ObjectId(httpRequest.body!._userId);

      const saving = await this.createSavingRepository.createSaving(
        httpRequest.body!
      );

      return created<ISaving>(saving);
    } catch (error) {
      return serverError("21");
    }
  }
}
