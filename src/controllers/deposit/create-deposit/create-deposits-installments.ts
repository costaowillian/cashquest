import { IDeposit } from "../../../models/deposit";
import { CreateDepositParams, ICreateDepositRepository } from "./protocols";
import { addMonths, format } from "date-fns";

export class CreateInstallmentsDepositsController {

    constructor(
        private readonly createDepositRepository: ICreateDepositRepository
      ) {}
    async handle(params: CreateDepositParams): Promise<IDeposit |  string | boolean> {
        try {
            const numMonths = params?.installments;

            const deposits = [];

            const installmentsValue = Math.floor( params.value / params.installments! * 100) / 100

            for (let i = 0; i < numMonths!; i++) {
                const newDate = addMonths(params.createAt, i);
                const depositData = { ...params, _userId: params._userId, createAt: newDate, value: installmentsValue};

                const deposit = await this.createDepositRepository.createDeposit(depositData);

                if(deposit) {
                    deposits.push(deposit);
                }
            }

            if(deposits.length == numMonths) {
                return deposits[0];
            }
            return false;

        } catch (error) {
            return "Server Error"
        }
    }
}