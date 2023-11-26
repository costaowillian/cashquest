import { ISpending } from "../../../models/spending";

export interface UpdateSpendingParams {
  category?: string;
  description?: string;
  value?: number;
  total?: number;
  isFixed?: boolean;
  comments?: string;
  installments?: number;
  isTransferred?: boolean;
  createAt?: Date;
  type?: string;
}

export interface IUpdateSpendingRepository {
  updateSpending(id: string, params: UpdateSpendingParams): Promise<ISpending>;
}
