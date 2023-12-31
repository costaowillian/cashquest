export interface ISpending {
    id: string;
    userId: string;
    category: string;
    description?: string;
    value: number;
    total: number;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt: Date;
    installments?: number;
    isTransferred: boolean;
    type: string;
}