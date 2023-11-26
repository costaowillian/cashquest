import { ISaving } from "../../../models/savings";

export interface UpdateSavingParams {
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

export interface IUpdateSavingRepository {
  update(id: string, params: UpdateSavingParams): Promise<ISaving>;
}
