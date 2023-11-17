import { ISaving } from "../../../models/savings";

export interface UpdateSavingParams {
    category?: string;
    description?: string;
    value?: number;
    total?: number;
    attachment?: string;
    isFixed?: boolean;
    comments?: string;
    userId?: string;
    installments?: number;
    isTransferred?: boolean; 
    type?: string;   
}

export interface IUpdateSavingRepository {
    update(id: string, params: UpdateSavingParams): Promise<ISaving>;
}