import { IDeposit } from "./deposit"
import { ISaving } from "./savings"
import { ISpending } from "./spending"

export interface IMonthlyRepost {
    depoists: IDeposit[],
    savings: ISaving[],
    spandings: ISpending[]
}