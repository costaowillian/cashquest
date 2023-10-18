import { ObjectId } from "mongodb";
import { IDeposit } from "../../../models/deposit";

export interface CreateDepositParams {
    _userId: string | ObjectId;
    category: string;
    description?: string;
    value: string;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt: Date;
}

export interface ICreateDepositRepository {
    createDeposit(params: CreateDepositParams):Promise<IDeposit | null>;
}