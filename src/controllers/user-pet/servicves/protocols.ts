import { IBasePet } from "../../../models/base-pet";

export interface IPetDetailsService {
    getXps(id: string): Promise<number>;
    getHealth(id: string): Promise<boolean>;
    getLevel(id: string): Promise<IBasePet>
}