export interface SavingGraphicParams {
    userId: string;
    startDate: Date;
    endDate: Date;
}

export interface IGetSavingGraphicRepository {
    getSavingGraphic(params: SavingGraphicParams, isFixed: boolean, Collection: string): Promise<any>;
}