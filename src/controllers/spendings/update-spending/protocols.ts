import { ISpending } from "../../../models/spending";

export interface UpdateSpendingParams {
  category?: string;
  description?: string;
  value?: number;
  total?: number;
  attachment?: string;
  isFixed?: boolean;
  comments?: string;
  userId?: string;
  installments?: number;
  isTransferred?: boolean;
  createdAt?: Date;
  type?: string;
}

export interface IUpdateSpendingRepository {
  updateSpending(id: string, params: UpdateSpendingParams): Promise<ISpending>;
}
