import { ObjectId } from "mongodb";

export interface CretateUserpetParams {
    id?: string,
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
  getSumSpendings(id: string): Promise<ICountTotal>;
}

export interface IGetSumDepositsRepository {
  getSumDeposits(id: string): Promise<ICountTotal>;
}
