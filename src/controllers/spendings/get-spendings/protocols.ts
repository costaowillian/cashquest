import { ISpending } from "../../../models/spending";

export interface IGetSpendingsRepository {
  getSpendingByUserId(userId: string): Promise<ISpending[]>;
}

export interface GetSpendingParams {
  userId: string;
}
