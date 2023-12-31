import { IBasePet } from "../../../models/base-pet";
import { IGetBasePetsRepository } from "../../base-pets/get-base-pets/protocols";
import {
  IGetSumDepositsRepository,
  IGetSumSavingsRepository,
  IGetSumSpendingsRepository,
  amountXps,
  baseXps
} from "../create-user-pet/protocols";
import {
  IGetTotalDepositsRepository,
  IGetTotalSpendingsRepository
} from "../../wallet/get-wallet/protocols";

export class PetDetailsService {
  constructor(
    private readonly getSumDepositsRepository: IGetSumDepositsRepository,
    private readonly getSumSpendingRepository: IGetSumSpendingsRepository,
    private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
    private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
    private readonly getSumSavingsRepository: IGetSumSavingsRepository,
    private readonly getBasePetsRepository: IGetBasePetsRepository
  ) {}
  async getXps(id: string): Promise<number> {
    const sumDeposits: any =
      await this.getSumDepositsRepository.getSumDeposits(id);
    const sumSpendings: any =
      await this.getSumSpendingRepository.getSumSpendings(id);
    const sumSavings: any =
      await this.getSumSavingsRepository.getSumSavings(id);

    let spendingsXps = 0;
    let depositsXps = 0;
    let savingsXps = 0;
    if (sumDeposits != 0 || sumSpendings != 0 || sumSavings != 0) {
      depositsXps = this.sumXps(amountXps.DEPOSITS, sumDeposits.total) || 0;
      spendingsXps = this.sumXps(amountXps.SPENDINGS, sumSpendings.total) || 0;
      savingsXps = this.sumXps(amountXps.SAVINGS, sumSavings.total) || 0;
    }

    const totalXps = depositsXps + spendingsXps + savingsXps;

    if (totalXps === null) {
      return 0;
    }
    console.log(totalXps);
    return totalXps;
  }

  private sumXps(xps: number, sumItems: number): number {
    return xps * sumItems;
  }

  async getHealth(id: string): Promise<boolean> {
    const totalDposits: any =
      await this.getTotalDepositsRepository.getTotalDeposits(id);
    const totalSpendings: any =
      await this.getTotalSpendingsRepository.getTotalSpendings(id);

    let health = 0;
    if (totalDposits != 0 && totalSpendings != 0) {
      health = totalDposits?.total - totalSpendings?.total;
    }

    if (health <= 0) {
      return true;
    }
    return false;
  }

  async getLevel(id: string): Promise<IBasePet> {
    const userXps = await this.getXps(id);

    const pets = await this.getBasePetsRepository.getBasePets();

    const petLevel = Math.floor(userXps / baseXps.BASEXPLEVEL);

    switch (petLevel) {
      case 0:
        return pets[0];
      case 1:
        return pets[1];
      case 2:
        return pets[2];
      case 3:
        return pets[3];
      case 4:
        return pets[4];
      case 5:
        return pets[5];
      case 6:
        return pets[6];
      default:
        return pets[6];
    }
  }
}
