import { IBasePet } from "../../../models/base-pet";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetBasePetRepository } from "./protocols";

export class GetBasePetController implements Icontroller {
  constructor(private readonly getBasePetRepository: IGetBasePetRepository) {}

  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<IBasePet | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("missing id");
      }

      const basePet = await this.getBasePetRepository.getBasePet(id);

      if (!basePet) {
        return notFound("Pet not found");
      }

      return ok<IBasePet>(basePet);
    } catch (error) {
      return serverError("12");
    }
  }
}
