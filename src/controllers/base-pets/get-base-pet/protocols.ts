import { IBasePet } from "../../../models/base-pet";

export interface IGetBasePetRepository {
    getBasePet(id: string): Promise<IBasePet | null>;
}