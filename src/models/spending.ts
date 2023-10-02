export interface ISpending {
    id: string;
    userId: string;
    description: string;
    createdAt: Date;
    value: number;
    type: string;
}