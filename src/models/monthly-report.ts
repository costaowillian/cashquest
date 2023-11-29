import { IDeposit } from "./deposit"
import { ISaving } from "./savings"
import { ISpending } from "./spending"

export interface IMonthlyReport {
    combinedArray: (IDeposit | ISaving | ISpending)[];
}
