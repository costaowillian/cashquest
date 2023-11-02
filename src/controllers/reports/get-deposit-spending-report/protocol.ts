export interface GetReportParams {
    userId: string;
    startDate: Date;
    endDate: Date;
}
  
export interface IGetReportRepoisitory {
    getMonthlyReport(params: GetReportParams, collectionName: string): Promise<any[]>
}