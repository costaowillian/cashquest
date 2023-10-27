import { ISaving } from "../../../models/savings";

export interface IDeleteSavingRepository {
    deleteSaving(id: string): Promise<ISaving>;
}