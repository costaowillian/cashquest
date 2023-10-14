import { IDeposit } from "../../../models/deposit";

export interface CreateDepositParams {
    userId: string;
    category: string;
    description?: string;
    value: string;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
}

export interface ICreateDepositRepository {
    createDeposit(params: CreateDepositParams):Promise<IDeposit | null>;
}