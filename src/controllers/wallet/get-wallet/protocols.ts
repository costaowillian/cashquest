import { ObjectId } from "mongodb";
import { Interface } from "readline";

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

export interface IGetTotalMonthlySpendingsRepository {
    getTotalSpendings(id: string, currentDate: Date): Promise<ITotal | null>
}