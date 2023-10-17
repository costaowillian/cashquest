import { IDeposit } from "../../../models/deposit";

export interface IGetDepositsRepository {
    getDeposits(): Promise<IDeposit[]>;
}