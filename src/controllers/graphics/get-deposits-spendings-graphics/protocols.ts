export interface SpandingAndDepositGraphicParams {
    userId: string;
    startDate: Date;
    endDate: Date;
}

export interface IGetSpandingAndDepositGraphicRepository {
    getSpandingAndDepositGraphic(params: SpandingAndDepositGraphicParams, Collection: string): Promise<any>;
}