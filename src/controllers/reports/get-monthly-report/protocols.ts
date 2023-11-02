export interface GetMonthlyReportParams {
    userId: string;
}
  
  export interface IGetMonthlyReportRepoisitory {
    getMonthlyReport(id: string, collectionName: string): Promise<any>
}