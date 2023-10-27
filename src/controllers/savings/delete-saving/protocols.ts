import { ISaving } from "../../../models/savings";

export interface DeleteSavingParams {
    id: string;
}

export interface IDeleteSavingRepository {
    deleteSaving(id: string): Promise<ISaving>;
}