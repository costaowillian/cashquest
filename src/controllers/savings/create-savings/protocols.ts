import { ObjectId } from "mongodb";
import { ISaving } from "../../../models/savings";

export interface CreateSavingParams {
    _userId: string | ObjectId;
    category: string;
    description?: string;
    value: number;
    total?: number;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt: Date;
    installments?: number;   
}

export interface ICreateSavingRepository {
    createSaving(params: CreateSavingParams): Promise<ISaving | null>
}