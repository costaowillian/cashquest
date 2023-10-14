import { IBasePet } from "../../../models/base-pet";
import { ok, serverError } from "../../helpers";
import { HttpResponse, Icontroller } from "../../protocols";
import { IGetBasePetsRepository } from "./protocols";

export class GetBasePetsController implements Icontroller {
  constructor(private readonly getBasePetsRepository: IGetBasePetsRepository) {}

  async handle(): Promise<HttpResponse<IBasePet[] | string>> {
    try {
      const basePets = await this.getBasePetsRepository.getBasePets();

      return ok<IBasePet[]>(basePets);
    } catch (error) {
      return serverError("11");
    }
  }
}
