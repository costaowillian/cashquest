import { ObjectId } from "mongodb";
import { ISpending } from "../../models/spending";

export interface CreateSpendingParams {
    _userId: string | ObjectId;
    category: string;
    description?: string;
    value: number;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt: Date;
}

export interface ICreateSpendingRepository {
    createSpending(params: CreateSpendingParams): Promise<ISpending>;
}