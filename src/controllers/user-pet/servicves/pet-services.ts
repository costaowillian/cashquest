import { IBasePet } from "../../../models/base-pet";
import { IGetBasePetsRepository } from "../../base-pets/get-base-pets/protocols";
import { IGetSumDepositsRepository, IGetSumSpendingsRepository, amountXps, baseXps } from "../create-user-pet/protocols";
import { IGetTotalDepositsRepository, IGetTotalSpendingsRepository } from "../../wallet/get-wallet/protocols";

export class PetDetailsService {

    constructor(
        private readonly getSumDepositsRepository: IGetSumDepositsRepository,
        private readonly getSumSpendingRepository: IGetSumSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getBasePetsRepository: IGetBasePetsRepository,
    ){

    }
    async getXps(id: string): Promise<number> {
        const sumDeposits = await this.getSumDepositsRepository.getSumDeposits(id);
        const sumSpendings = await this.getSumSpendingRepository.getSumSpendings(id);

        const depositsXps = this.sumXps(amountXps.DEPOSITS, sumDeposits.total);
        const spendingsXps = this.sumXps(amountXps.SPENDINGS, sumSpendings.total);

        const totalXps = depositsXps + spendingsXps

        return totalXps;
    }

    private sumXps(xps: number, sumItems: number): number{
            return xps + sumItems;
    }

    async  getHealth(id: string): Promise<boolean> {
        const totalDposits = await this.getTotalDepositsRepository.getTotalDeposits(id);
        const totalSpendings = await this.getTotalSpendingsRepository.getTotalSpendings(id);

        let health = 0
        if (totalDposits && totalSpendings) {
            health = totalDposits?.total - totalSpendings?.total;
        }

        if(health < 0) {
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
            case 4:
                return pets[3];
            case 5:
                return pets[4];
            case 6:
                return pets[5];
            case 7:
                return pets[6];
            default:
                return pets[0]; 
        }
    }
}