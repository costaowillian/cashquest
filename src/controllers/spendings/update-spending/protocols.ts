import { ISpending } from "../../../models/spending";

export interface UpdateSpendingParams {
  category?: string;
  description?: string;
  value?: number;
  attachment?: string;
  total?: number,
  isFixed?: boolean;
  comments?: string;
  userId?: string;
}

export interface IUpdateSpendingRepository {
  updateSpending(id: string, params: UpdateSpendingParams): Promise<ISpending>;
}
