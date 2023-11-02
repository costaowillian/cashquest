export interface GetMonthlyReportParams {
    userId: string;
    date: Date;
}
  
export interface IGetMonthlyReportRepoisitory {
    getMonthlyReport(params: GetMonthlyReportParams, collectionName: string): Promise<any[]>
}