import { ObjectId } from "mongodb";

export interface IGetWalletParams {
    userId: string;
}

export interface ITotalSpendings {
    userId: string,
    total: number;
}

export interface IGetTotalSpendingsRepository {
    getTotalSpendings(id: string): Promise<ITotalSpendings | null>
}