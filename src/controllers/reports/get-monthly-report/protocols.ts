export interface GetMonthlyReportParams {
    userId: string;
    endDate: Date;
}
  
export interface IGetMonthlyReportRepoisitory {
    getMonthlyReport(params: GetMonthlyReportParams, collectionName: string): Promise<any[]>
}