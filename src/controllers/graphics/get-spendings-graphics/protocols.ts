export interface SpendingsGraphicParams {
    userId: string;
    startDate: Date;
    endDate: Date;
}

export interface IGetSpendingsGraphicRepository {
    getSpendingsGraphic(params: SpendingsGraphicParams, isFixed: boolean, collection: string): Promise<any>;
}