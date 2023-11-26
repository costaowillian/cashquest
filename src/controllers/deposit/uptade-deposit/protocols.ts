import { IDeposit } from "../../../models/deposit";

export interface UpdateDepositParams {
  category?: string;
  description?: string;
  value?: number;
  total?: number;
  isFixed?: boolean;
  comments?: string;
  installments?: number;
  createAt?: Date;
  type?: string;
}

export interface IUpdateDepositRepository {
  update(id: string, params: UpdateDepositParams): Promise<IDeposit>;
}
