export interface IDeposit {
    id: string;
    _userId: string;
    category: string;
    description?: string;
    value: string;
    attachment?: string;
    isFixed: boolean;
    comments?: string;
    createAt: Date;
}