export interface GetReportParams {
    userId: string;
    startDate: Date;
    endDate: Date;
}
  
export interface IGetReportRepoisitory {
    getReport(params: GetReportParams, collectionName: string): Promise<any[]>
}