import { IDeposit } from "../../../models/deposit";

export interface IGetDepositsRepository {
  getDeposits(id: string): Promise<IDeposit[]>;
}

export interface GetDepositParams {
  userId: string;
}
