import { ISpending } from "../../../models/spending";
import { CreateSpendingParams, ICreateSpendingRepository } from "./protocols";
import { addMonths } from "date-fns";

export class CreateInstallmentsSpendingCOntroller {
    constructor(
        private readonly creatSpendingRepository: ICreateSpendingRepository
    ) {}
    async handle(params: CreateSpendingParams): Promise<ISpending |  string | boolean> {
        try {
            const numMonths = params?.installments;

            const spendings = [];

            const installmentsValue = Math.floor( params.value / params.installments! * 100) / 100

            for (let i = 0; i < numMonths!; i++) {
                const newDate = addMonths(params.createAt, i);
                const depositData = { ...params, _userId: params._userId, createAt: newDate, value: installmentsValue};

                const spending = await this.creatSpendingRepository.createSpending(depositData);

                if(spending) {
                    spendings.push(spending);
                }
            }

            if(spendings.length == numMonths) {
                return spendings[0];
            }
            return false;

        } catch (error) {
            return "Server Error"
        }
    }

}