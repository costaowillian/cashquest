import { IUserPet } from "../../../models/user-pet";

export interface CretateUserpetParams {
    userId: string;
    name: string;
    createdAt: Date;
}

export interface CreateUserPetRepository {
    createUserPet(params: CretateUserpetParams): Promise <IUserPet>;
}