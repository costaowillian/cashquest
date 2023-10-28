import { IDeposit } from "../../../models/deposit"

export interface IDeleteDepositRepository {
    deleteDeposit(id: string): Promise<IDeposit| null>
}