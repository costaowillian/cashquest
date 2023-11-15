import { IDeposit } from "./deposit"
import { ISaving } from "./savings"
import { ISpending } from "./spending"

export interface IMonthlyRepost {
    combinedArray: (IDeposit | ISaving | ISpending)[];
}
