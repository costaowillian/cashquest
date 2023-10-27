import { ISaving } from "../../../models/savings";

export interface GetSavingParams {
    userId: string;
}

export interface IGetSavingsRepository {
    getSavings(id: string): Promise<ISaving[]>;
}