export interface IDeposit {
    id: string;
    userId: string;
    category: string;
    description?: string;
    value: number;
    total: number;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createdAt: Date;
    installments?: number;
}