import { ISaving } from "../../../models/savings";

export interface IGetSavingRepository {
    getSaving(id:string): Promise<ISaving |null>;
}