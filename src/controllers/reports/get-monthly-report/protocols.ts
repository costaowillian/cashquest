import { IDeposit } from "../../../models/deposit";
import { ISaving } from "../../../models/savings";
import { ISpending } from "../../../models/spending";

export interface IGetMonthlyReportRepoisitory {
    getMonthlyReport(id: string, collectionName: string): Promise<any>
}