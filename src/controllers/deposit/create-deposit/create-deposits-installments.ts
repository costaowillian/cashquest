import { IDeposit } from "../../../models/deposit";
import { formatDate } from "../../helpers";
import { CreateDepositParams, ICreateDepositRepository } from "./protocols";
import { addMonths } from "date-fns";

export class CreateInstallmentsDepositsController {
  constructor(
    private readonly createDepositRepository: ICreateDepositRepository
  ) {}
  async handle(
    params: CreateDepositParams
  ): Promise<IDeposit | string | boolean> {
    try {
      const numMonths = params?.installments;

      const deposits = [];

      const installmentsValue =
        Math.floor((params.value / params.installments!) * 100) / 100;

      for (let i = 0; i < numMonths!; i++) {
        const newDate = new Date(params.createAt);
        const date = addMonths(newDate, i);
        const depositData = {
          ...params,
          total: params.value,
          _userId: params._userId,
          createAt: formatDate(date),
          value: installmentsValue
        };

        const deposit =
          await this.createDepositRepository.createDeposit(depositData);

        if (deposit) {
          deposits.push(deposit);
        }
      }

      if (deposits.length == numMonths) {
        return deposits[0];
      }
      return false;
    } catch (error) {
      return "Server Error";
    }
  }
}
