import { addMonths } from "date-fns";
import { CreateSavingParams, ICreateSavingRepository } from "./protocols";
import { ISaving } from "../../../models/savings";

export class CreateInstallmentsSavingController {

    constructor(
        private readonly creatSavingsRepository: ICreateSavingRepository
    ) { }
    
    async handle(params: CreateSavingParams): Promise<ISaving |  string | boolean> {
        try {
            const numMonths = params?.installments;

            const savings = [];

            const installmentsValue = Math.floor( params.value / params.installments! * 100) / 100

            for (let i = 0; i < numMonths!; i++) {
                const newDate = addMonths(params.createAt, i);
                const depositData = { ...params, total: params.value, _userId: params._userId, createAt: newDate, value: installmentsValue};

                const saving = await this.creatSavingsRepository.createSaving(depositData);

                if(saving) {
                    savings.push(saving);
                }
            }

            if(savings.length == numMonths) {
                return savings[0];
            }
            return false;

        } catch (error) {
            return "Server Error"
        }
    }
}