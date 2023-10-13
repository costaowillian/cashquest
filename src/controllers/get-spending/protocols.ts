import { ISpending } from "../../models/spending";

export interface IGetSpedingRepository {
    getSpending(id: string): Promise<ISpending>;
}