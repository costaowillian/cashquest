import { IDeposit } from "../../../models/deposit";

export interface IGetDepositRepository {
    getDeposit(id:string): Promise<IDeposit|null>;
}