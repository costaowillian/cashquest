import { IDeposit } from "../../../models/deposit";

export interface UpdateDepositParams {
    category?: string;
    description?: string;
    value?: number;
    attachment?: string;
    isFixed?: boolean;
    comments?: string;
}

export interface IUpdateDepositRepository {
    update(id: string, params: UpdateDepositParams): Promise<IDeposit>;
}