import { ISpending } from "../../../models/spending";

export interface IGetSpendingRepository {
  getSpending(id: string): Promise<ISpending | null>;
}
