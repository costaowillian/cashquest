export interface IUserPet {
    id: string;
    userId: string;
    level: string; //id do nivel do pet no banco de dados
    health: boolean;
    xps: number;
    name: string;
    createdAt: Date;
}