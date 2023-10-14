import { IBasePet } from "../../../models/base-pet";

export interface IGetBasePetsRepository {
  getBasePets(): Promise<IBasePet[]>;
}
