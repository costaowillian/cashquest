import { ObjectId } from "mongodb";

export interface IGetWalletParams {
    userId: string;
}

export interface ITotal {
    userId: string,
    total: number;
}

export interface IGetTotalSpendingsRepository {
    getTotalSpendings(id: string): Promise<ITotal | null>
}

export interface IGetTotalDepositsRepository {
    getTotalDeposits(id: string): Promise<ITotal | null>
}