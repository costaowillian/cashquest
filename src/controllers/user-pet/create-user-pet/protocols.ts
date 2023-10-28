import { ObjectId } from "mongodb";
import { ISaving } from "../../../models/savings";

export interface CretateUserpetParams {
  id?: string;
  _userId: string | ObjectId;
  name: string;
  createdAt: Date;
}

export enum baseXps {
  BASEXPLEVEL = 500
}

export enum amountXps {
  DEPOSITS = 30,
  SPENDINGS = 60,
  SAVINGS = 45,
  GOALS = 55
}
export interface ICountTotal {
  total: number;
}

export interface ICreateUserPetRepository {
  createUserPet(params: CretateUserpetParams): Promise<CretateUserpetParams>;
}

export interface IGetSumSpendingsRepository {
  getSumSpendings(id: string): Promise<any>;
}

export interface IGetSumDepositsRepository {
  getSumDeposits(id: string): Promise<ICountTotal | number>;
}

export interface IGetSumSavingsRepository {
  getSumSavings(id: string): Promise<ISaving | number>;
}
