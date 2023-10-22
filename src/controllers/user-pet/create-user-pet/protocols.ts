import { IUserPet } from "../../../models/user-pet";

export interface CretateUserpetParams {
    userId: string;
    name: string;
    createdAt: Date;
}

export interface ICountTotal {
    total: number;
}

export interface CreateUserPetRepository {
    createUserPet(params: CretateUserpetParams): Promise <IUserPet>;
}

export interface IGetSumSpendingsRepository {
    getSumSpendings(id: string):Promise<ICountTotal>
}

export interface IGetSumDepositsRepository {
    getSumDeposits(id: string):Promise<ICountTotal>
}

