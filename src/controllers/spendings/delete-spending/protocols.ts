import { ISpending } from "../../../models/spending";

export interface IDeleteSpendingRepository {
  deleteSpending(id: string): Promise<ISpending | null>;
}
