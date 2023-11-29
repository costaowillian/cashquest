import { ObjectId } from "mongodb";
import { IDeposit } from "../../../models/deposit";

export interface CreateDepositParams {
    _userId: string | ObjectId;
    category: string;
    description?: string;
    value: number;
    total?: number;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt:;
    installments?: number;
    type: string;
}

export interface ICreateDepositRepository {
    createDeposit(params: CreateDepositParams):Promise<IDeposit | null>;
}