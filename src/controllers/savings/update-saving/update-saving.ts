import { ISaving } from "../../../models/savings";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IUpdateSavingRepository, UpdateSavingParams } from "./protocols";

export class UpdateSavingController implements Icontroller {
  constructor(
    private readonly updateSavingRepository: IUpdateSavingRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateSavingParams>
  ): Promise<HttpResponse<ISaving | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing body");
      }

      if (!id) {
        return badRequest("Missing saving id");
      }

      const AllowedToUpdate: (keyof UpdateSavingParams)[] = [
        "category",
        "description",
        "value",
        "isFixed",
        "comments",
        "isTransferred",
        "installments",
        "createAt",
        "type",
        "total"
      ];
      const someFieldsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !AllowedToUpdate.includes(key as keyof UpdateSavingParams)
      );

      if (someFieldsNotAllowedToUpdate) {
        return badRequest("Some received fields is not allowed");
      }

      const updatedbody = { ...body };

      const saving = await this.updateSavingRepository.update(id, updatedbody);

      return ok<ISaving>(saving);
    } catch (error) {
      return serverError("25");
    }
  }
}
