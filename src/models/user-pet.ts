import { IBasePet } from "./base-pet";
export interface IUserPet {
    id: string;
    userId: string;
    pet: IBasePet;
    health: boolean;
    xps: number;
    name: string;
    createdAt: Date;
}