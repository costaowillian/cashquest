import { CretateUserpetParams } from "../create-user-pet/protocols";

export interface IGetUserPetRepository {
    getUserPet(id: string): Promise<CretateUserpetParams>

}