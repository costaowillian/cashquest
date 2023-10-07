export interface ISpending {
    id: string;
    userId: string;
    category: string;
    description?: string;
    value: string;
    attachment?: string;
    createAt: Date;
}