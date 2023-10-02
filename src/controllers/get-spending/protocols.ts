import { ISpending } from "../../models/spending";

export interface IGetSpendingRepository {
    getSpendingByUserId(userId: string): Promise<ISpending[]>;
}

export interface GetSpendingParams {
    userId: string;
}
