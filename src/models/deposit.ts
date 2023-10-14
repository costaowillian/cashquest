export interface IDeposit {
    id: string;
    userId: string;
    category: string;
    description?: string;
    value: string;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt: Date;
}