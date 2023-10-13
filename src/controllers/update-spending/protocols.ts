import { ISpending } from "../../models/spending";

export interface UpdateSpendingParams {
    category: string;
    description?: string;
    value: string;
    attachment?: string;
}

export interface IUpdateSpendingRepository {
    updateSpending(id: string, params: UpdateSpendingParams): Promise<ISpending>;
}