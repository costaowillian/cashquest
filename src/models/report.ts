import { IDeposit } from "./deposit"
import { ISpending } from "./spending";

export interface IReport {
    depoists: IDeposit;
    spandings: ISpending; 
}