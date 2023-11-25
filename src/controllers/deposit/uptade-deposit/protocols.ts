import { IDeposit } from "../../../models/deposit";

export interface UpdateDepositParams {
    category?: string;
    description?: string;
    value?: number;
    attachment?: string;
    isFixed?: boolean;
    comments?: string;
    userId?: string;
    installments?: number;
    createdAt?: Date;
    isTransferred?: boolean;
    type?: string
}

export interface IUpdateDepositRepository {
    update(id: string, params: UpdateDepositParams): Promise<IDeposit>;
}